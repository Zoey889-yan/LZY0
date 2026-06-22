import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { sentimentData } from "../data/sentimentData";

const chartData = sentimentData.map((d, i) => ({
  idx: i + 1,
  tweets: Math.round(d.tweets),
  sentiment: Math.round(d.sentiment * 10000) / 10000,
  date: d.date,
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const tw = payload.find(p => p.dataKey === "tweets");
    const se = payload.find(p => p.dataKey === "sentiment");
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{d.date}</div>
        {tw && <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Tweets: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{tw.value.toLocaleString()}</span></div>}
        {se && <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Sentiment: <span style={{ color: "#d4a373", fontWeight: 600 }}>{(se.value * 100).toFixed(1)}%</span></div>}
      </div>
    );
  }
  return null;
};


export default function DailyTweetSentimentCombined() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="idx"
            ticks={[15,45,74,105,135,166,196,227,258,288,319,349]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][[15,45,74,105,135,166,196,227,258,288,319,349].indexOf(v)] || ""}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => (v >= 1000 ? (v/1000).toFixed(0)+"k" : v)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            domain={[0, 1]}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="tweets"
            radius={[2, 2, 0, 0]}
            maxBarSize={4}
            opacity={0.4}
            fill="#6366f1"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="sentiment"
            stroke="#d4a373"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: "#d4a373", stroke: "rgba(212,163,115,0.3)", strokeWidth: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 12, height: 12, borderRadius: 2, background: "rgba(99,102,241,0.5)" }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Daily Tweets</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 3, background: "#d4a373", borderRadius: 2 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Sentiment Score</span></div>
      </div>
    </div>
  );
}
