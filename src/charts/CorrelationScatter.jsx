import { useState, useRef, useCallback, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { sentimentData } from "../data/sentimentData";

// Split into H1 (Jan-Jun, 181 days) and H2 (Jul-Dec)
const h1Data = sentimentData.slice(0, 181).map(d => ({ ...d, group: "H1" }));
const h2Data = sentimentData.slice(181).map(d => ({ ...d, group: "H2" }));

function computeRegression(data) {
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.tweets, 0);
  const sumY = data.reduce((s, d) => s + d.sentiment, 0);
  const sumXY = data.reduce((s, d) => s + d.tweets * d.sentiment, 0);
  const sumX2 = data.reduce((s, d) => s + d.tweets * d.tweets, 0);
  const sumY2 = data.reduce((s, d) => s + d.sentiment * d.sentiment, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const rNum = n * sumXY - sumX * sumY;
  const rDen = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r = rNum / rDen;
  return { slope, intercept, r };
}

const regH1 = computeRegression(h1Data);
const regH2 = computeRegression(h2Data);

const allTweets = sentimentData.map(d => d.tweets);
const xMin = Math.min(...allTweets);
const xMax = Math.max(...allTweets);
const xPad = (xMax - xMin) * 0.05;

const LINE_MARGIN = { top: 8, right: 16, left: 0, bottom: 4 };
const CHART_HEIGHT = 360;

// Regression line endpoints in data space
const lineH1Endpoints = {
  x1: xMin - xPad, y1: regH1.slope * (xMin - xPad) + regH1.intercept,
  x2: xMax + xPad, y2: regH1.slope * (xMax + xPad) + regH1.intercept,
};
const lineH2Endpoints = {
  x1: xMin - xPad, y1: regH2.slope * (xMin - xPad) + regH2.intercept,
  x2: xMax + xPad, y2: regH2.slope * (xMax + xPad) + regH2.intercept,
};

// Map data coords to pixel coords within the chart area
function dataToPixel(val, domainMin, domainMax, rangeMin, rangeMax) {
  const pct = (val - domainMin) / (domainMax - domainMin);
  return rangeMin + pct * (rangeMax - rangeMin);
}

function RegressionLines({ chartWidth, xDomain, yDomain }) {
  if (!chartWidth) return null;
  const plotW = chartWidth - LINE_MARGIN.left - LINE_MARGIN.right;
  const plotH = CHART_HEIGHT - LINE_MARGIN.top - LINE_MARGIN.bottom;

  const h1px1 = dataToPixel(lineH1Endpoints.x1, xDomain[0], xDomain[1], LINE_MARGIN.left, LINE_MARGIN.left + plotW);
  const h1px2 = dataToPixel(lineH1Endpoints.x2, xDomain[0], xDomain[1], LINE_MARGIN.left, LINE_MARGIN.left + plotW);
  const h1py1 = dataToPixel(lineH1Endpoints.y1, yDomain[0], yDomain[1], LINE_MARGIN.top + plotH, LINE_MARGIN.top);
  const h1py2 = dataToPixel(lineH1Endpoints.y2, yDomain[0], yDomain[1], LINE_MARGIN.top + plotH, LINE_MARGIN.top);

  const h2px1 = dataToPixel(lineH2Endpoints.x1, xDomain[0], xDomain[1], LINE_MARGIN.left, LINE_MARGIN.left + plotW);
  const h2px2 = dataToPixel(lineH2Endpoints.x2, xDomain[0], xDomain[1], LINE_MARGIN.left, LINE_MARGIN.left + plotW);
  const h2py1 = dataToPixel(lineH2Endpoints.y1, yDomain[0], yDomain[1], LINE_MARGIN.top + plotH, LINE_MARGIN.top);
  const h2py2 = dataToPixel(lineH2Endpoints.y2, yDomain[0], yDomain[1], LINE_MARGIN.top + plotH, LINE_MARGIN.top);

  return (
    <svg width={chartWidth} height={CHART_HEIGHT} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
      <line x1={h1px1} y1={h1py1} x2={h1px2} y2={h1py2} stroke="#60a5fa" strokeWidth={2} strokeDasharray="6 4" />
      <line x1={h2px1} y1={h2py1} x2={h2px2} y2={h2py2} stroke="#fb923c" strokeWidth={2} strokeDasharray="6 4" />
    </svg>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const label = d.group === "H1" ? "H1 (Jan-Jun)" : "H2 (Jul-Dec)";
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{label}</div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "0.15rem" }}>
          Tweets: <span style={{ fontWeight: 600 }}>{d.tweets.toFixed(0)}</span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-primary)" }}>
          Sentiment: <span style={{ fontWeight: 600 }}>{(d.sentiment * 100).toFixed(1)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CorrelationScatter() {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setChartWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const xDomain = [xMin - xPad, xMax + xPad];
  const yDomain = [0, 1];

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <ScatterChart margin={LINE_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="tweets" axisLine={false} tickLine={false}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => (v / 1000).toFixed(0) + "k"}
            domain={xDomain} type="number"
            label={{ value: "Daily Tweet Volume", position: "bottom", offset: -2, style: { fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" } }}
          />
          <YAxis dataKey="sentiment" axisLine={false} tickLine={false} domain={yDomain}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => (v * 100).toFixed(0) + "%"}
            label={{ value: "Sentiment Score", angle: -90, position: "insideLeft", style: { fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.1)" }} />
          <ReferenceLine y={0.5} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <Scatter name="H1" data={h1Data} fill="#60a5fa" opacity={0.6} r={3.5} />
          <Scatter name="H2" data={h2Data} fill="#fb923c" opacity={0.6} r={3.5} />
        </ScatterChart>
      </ResponsiveContainer>
      {/* SVG overlay for regression lines */}
      <RegressionLines chartWidth={chartWidth} xDomain={xDomain} yDomain={yDomain} />
      {/* Legend & stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#60a5fa", opacity: 0.7 }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>H1 (Jan-Jun) · n={h1Data.length}</span>
          <span style={{ fontSize: "0.7rem", color: "#60a5fa", fontFamily: "var(--font-mono)" }}>r = {regH1.r.toFixed(3)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fb923c", opacity: 0.7 }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>H2 (Jul-Dec) · n={h2Data.length}</span>
          <span style={{ fontSize: "0.7rem", color: "#fb923c", fontFamily: "var(--font-mono)" }}>r = {regH2.r.toFixed(3)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ width: 20, height: 0, borderTop: "2px dashed #60a5fa" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>H1 trend</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ width: 20, height: 0, borderTop: "2px dashed #fb923c" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>H2 trend</span>
        </div>
      </div>
    </div>
  );
}