import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea
} from "recharts";
import { sentimentData, stats } from "../data/sentimentData";

// Format data for the chart - add a numeric day index
const chartData = sentimentData.map((d, i) => ({
  idx: i + 1,
  tweets: Math.round(d.tweets),
  date: d.date,
  month: parseInt(d.date.split(''/'')[1], 10),
}));

const pointEvents = [
  { idx: 73, date: "2023/3/14", label: "GPT-4正式官宣发布", color: "#818cf8" },
  { idx: 199, date: "2023/7/18", label: "Meta正式开源Llama 2大模型", color: "#34d399" },
  { idx: 345, date: "2023/12/11", label: "年末行业隐患集中复盘，公众AI好感持续走低", color: "#ef4444" },
];

const rangeEvents = [
  { startIdx: 7, endIdx: 24, label: "达沃斯、微软商用落地多重利好叠加，公众情绪达到峰值", color: "#34d399" },
  { startIdx: 142, endIdx: 152, label: "全球多国集中出台AI监管草案", color: "#f59e0b" },
];

// Annotate each data point with any active event
chartData.forEach(d => {
  d.events = [];
  pointEvents.forEach(ev => {
    if (Math.abs(d.idx - ev.idx) <= 1) {
      d.events.push(ev.label);
    }
  });
  rangeEvents.forEach(ev => {
    if (d.idx >= ev.startIdx && d.idx <= ev.endIdx) {
      d.events.push(ev.label);
    }
  });
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", maxWidth: "260px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{d.date}</div>
        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: d.events.length ? "0.5rem" : 0 }}>
          Tweets: <span style={{ fontWeight: 600, color: "var(--accent)" }}>{d.tweets.toLocaleString()}</span>
        </div>
        {d.events.length > 0 && d.events.map((ev, i) => (
          <div key={i} style={{ fontSize: "0.8125rem", color: "#fbbf24", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.06)", paddingTop: "0.35rem", marginTop: "0.35rem" }}>
            {"\u{1F4CC}"} {ev}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DailyTweetChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => (v >= 1000 ? (v/1000).toFixed(0)+"k" : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={stats.avgDailyTweets} stroke="rgba(167,139,250,0.3)" strokeDasharray="4 4" />

          {/* Event: Jan peak range */}
          <ReferenceArea x1={7} x2={24} fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.2)" strokeDasharray="3 3" />

          {/* Event: AI Regulation range */}
          <ReferenceArea x1={142} x2={152} fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" strokeDasharray="3 3" />

          {/* Event markers */}
          <ReferenceLine x={73} stroke="rgba(129,140,248,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={199} stroke="rgba(52,211,153,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={345} stroke="rgba(239,68,68,0.35)" strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="tweets"
            stroke="#6366f1"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "#6366f1", stroke: "rgba(99,102,241,0.3)", strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 20, height: 2, background: "#6366f1", borderRadius: 1 }} />
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Daily Tweets</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 20, height: 2, background: "rgba(167,139,250,0.3)", borderRadius: 1, borderTop: "2px dashed rgba(167,139,250,0.3)" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Yearly Avg</span>
        </div>
      </div>
    </div>
  );
}
