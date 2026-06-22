import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { monthlyAggregates } from "../data/sentimentData";

const maxTotal = Math.max(...monthlyAggregates.map(d => d.totalTweets));
const peakMonth = monthlyAggregates.find(d => d.totalTweets === maxTotal)?.label || "";

const fmt = (v) => v.toLocaleString();

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tw = payload.find(p => p.dataKey === "avgTweets");
    const se = payload.find(p => p.dataKey === "avgSentiment");
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.35rem" }}>{label}</div>
        {tw && <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Tweets: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{fmt(tw.value)}</span></div>}
        {se && <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Sentiment: <span style={{ color: "#d4a373", fontWeight: 600 }}>{(se.value * 100).toFixed(1)}%</span></div>}
      </div>
    );
  }
  return null;
};

export default function CombinedChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={monthlyAggregates} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#5c5c6e", fontSize: 12, fontFamily: "var(--font-mono)" }} />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }} tickFormatter={(v) => (v >= 1000 ? (v/1000).toFixed(0)+"k" : v)} />
          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[0, 1]} tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }} tickFormatter={(v) => (v*100).toFixed(0)+"%"} />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="left" dataKey="avgTweets" radius={[4, 4, 0, 0]} maxBarSize={30} opacity={0.6}>
            {monthlyAggregates.map((entry, idx) => (
              <Cell key={idx} fill={entry.label === peakMonth ? "#6366f1" : "rgba(99,102,241,0.35)"} />
            ))}
          </Bar>
          <Line yAxisId="right" type="monotone" dataKey="avgSentiment" stroke="#d4a373" strokeWidth={3} dot={{ r: 4, fill: "#d4a373", stroke: "#161621", strokeWidth: 2 }} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 12, height: 12, borderRadius: 2, background: "rgba(99,102,241,0.5)" }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Avg Tweets</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 3, background: "#d4a373", borderRadius: 2 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Avg Sentiment</span></div>
      </div>
    </div>
  );
}
