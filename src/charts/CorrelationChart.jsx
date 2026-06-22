import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import { sentimentData } from "../data/sentimentData";

const mLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Build single data array: daily points + monthly avg markers
const combinedData = [];
const monthlyAvgData = [];

for (let m = 0; m < 12; m++) {
  const days = sentimentData.filter(d => parseInt(d.date.split("/")[1], 10) - 1 === m);
  const avgSent = days.reduce((s, d) => s + d.sentiment, 0) / days.length;
  const avgTweets = Math.round(days.reduce((s, d) => s + d.tweets, 0) / days.length);

  monthlyAvgData.push({
    monthX: m + 0.5,
    avgSentiment: Math.round(avgSent * 10000) / 10000,
    avgTweets,
    label: mLabels[m],
  });

  days.forEach((d, i) => {
    const spread = (i / Math.max(days.length - 1, 1)) * 0.9 - 0.45;
    combinedData.push({
      monthX: m + 0.5 + spread + (Math.random() - 0.5) * 0.15,
      sentiment: Math.round(d.sentiment * 10000) / 10000,
      tweets: Math.round(d.tweets),
      date: d.date,
      month: m,
      avgSentiment: null,
    });
  });
}

// Continuous sentiment color: green (#22c55e) -> yellow (#eab308) -> red (#ef4444)
function sentimentGradient(s) {
  const t = Math.max(0, Math.min(1, (s - 0.1) / 0.8));
  const r = Math.round(34 + (239 - 34) * t);
  const g = Math.round(197 + (68 - 197) * t);
  const b = Math.round(94 + (68 - 94) * t);
  return `rgba(${r},${g},${b},0.55)`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    if (d.avgSentiment !== undefined && d.avgSentiment !== null) {
      return (
        <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{d.label}</div>
          <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Avg Sentiment: <span style={{ color: "#d4a373", fontWeight: 600 }}>{(d.avgSentiment * 100).toFixed(1)}%</span></div>
          <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Avg Tweets: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{d.avgTweets.toLocaleString()}</span></div>
        </div>
      );
    }
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{d.date}</div>
        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Sentiment: <span style={{ color: "#d4a373", fontWeight: 600 }}>{(d.sentiment * 100).toFixed(1)}%</span></div>
        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Tweets: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{d.tweets.toLocaleString()}</span></div>
      </div>
    );
  }
  return null;
};

function renderDailyDot(props) {
  const { cx, cy, payload } = props;
  if (!cx || !cy || payload.avgSentiment !== null) return null;
  const r = Math.max(2.5, Math.min(7, payload.tweets / 3200));
  return <circle cx={cx} cy={cy} r={r} fill={sentimentGradient(payload.sentiment)} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />;
}

function renderAvgDot(props) {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  return <circle cx={cx} cy={cy} r={5} fill="#d4a373" stroke="#161621" strokeWidth={2} />;
}

function renderAvgActiveDot(props) {
  const { cx, cy } = props;
  return <circle cx={cx} cy={cy} r={7} fill="#d4a373" stroke="#161621" strokeWidth={3} />;
}

export default function CorrelationChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={combinedData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={true} />
          <XAxis
            dataKey="monthX"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            ticks={[0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5]}
            tickFormatter={(v) => mLabels[Math.round(v - 0.5)] || ""}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 1]}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0.5} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

          {/* Daily points: render as dots, no connecting line */}
          <Line type="monotone" dataKey="sentiment" stroke="none" dot={renderDailyDot} activeDot={false} isAnimationActive={false} />

          {/* Monthly average: trend line with dots */}
          <Line type="monotone" data={monthlyAvgData} dataKey="avgSentiment" stroke="#d4a373" strokeWidth={2.5} dot={renderAvgDot} activeDot={renderAvgActiveDot} connectNulls={true} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: sentimentGradient(0.9) }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>High</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: sentimentGradient(0.6) }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Moderate</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: sentimentGradient(0.3) }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Low</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: sentimentGradient(0.1) }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Critical</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ width: 20, height: 3, background: "#d4a373", borderRadius: 1 }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Monthly Avg</span>
        </div>
      </div>
    </div>
  );
}
