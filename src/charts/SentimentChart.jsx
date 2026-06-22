import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea
} from "recharts";
import { sentimentData } from "../data/sentimentData";

// Aggregate weekly
const weeklyData = [];
for (let i = 0; i < sentimentData.length; i += 7) {
  const week = sentimentData.slice(i, i + 7);
  const avg = week.reduce((s, d) => s + d.sentiment, 0) / week.length;
  weeklyData.push({
    week: Math.floor(i / 7) + 1,
    sentiment: Math.round(avg * 10000) / 10000,
    date: week[0].date,
  });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>Week {label}</div>
        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
          Sentiment: <span style={{ fontWeight: 600, color: "#d4a373" }}>{(payload[0].value * 100).toFixed(1)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function SentimentChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={weeklyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => { const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return labels[Math.min(Math.round((v/52)*11),11)] || "" }}
            ticks={[4, 9, 13, 17, 22, 26, 30, 35, 39, 43, 48, 52]}
          />
          <YAxis axisLine={false} tickLine={false} domain={[0, 1]} tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }} tickFormatter={(v) => `${(v*100).toFixed(0)}%`} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0.5} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <ReferenceArea y1={0.7} y2={1.0} fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.15)" strokeDasharray="4 4" />
          <ReferenceArea y1={0} y2={0.3} fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.15)" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="sentiment" stroke="#d4a373" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#d4a373", stroke: "rgba(212,163,115,0.3)", strokeWidth: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "rgba(34,197,94,0.3)", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Optimistic</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "#d4a373", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Weekly Avg</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "rgba(239,68,68,0.3)", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Pessimistic</span></div>
      </div>
    </div>
  );
}
