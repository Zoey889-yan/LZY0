import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { monthlyAggregates, stats } from "../data/sentimentData";

const maxTotal = Math.max(...monthlyAggregates.map(d => d.totalTweets));
const minTotal = Math.min(...monthlyAggregates.map(d => d.totalTweets));
const peakMonth = monthlyAggregates.find(d => d.totalTweets === maxTotal)?.label || "";
const lowMonth = monthlyAggregates.find(d => d.totalTweets === minTotal)?.label || "";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{label}</div>
        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
          Avg Daily Tweets: <span style={{ fontWeight: 600, color: "var(--accent)" }}>{payload[0].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TweetCountChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={monthlyAggregates} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#5c5c6e", fontSize: 12, fontFamily: "var(--font-mono)" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
          <Bar dataKey="avgTweets" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {monthlyAggregates.map((entry, idx) => (
              <Cell key={idx} fill={entry.label === peakMonth ? "url(#barActive)" : entry.label === lowMonth ? "url(#barLow)" : "rgba(99,102,241,0.45)"} />
            ))}
          </Bar>
          <defs>
            <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="barLow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(99,102,241,0.45)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Monthly Avg</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#6366f1" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Peak: {peakMonth}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#f59e0b" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Lowest: {lowMonth}</span>
        </div>
      </div>
    </div>
  );
}
