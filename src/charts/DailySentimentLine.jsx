import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea
} from "recharts";
import { sentimentData } from "../data/sentimentData";

const chartData = sentimentData.map((d, i) => ({
  idx: i + 1,
  sentiment: Math.round(d.sentiment * 10000) / 10000,
  date: d.date,
}));

const pointEvents = [
  { idx: 36, date: "2023/2/5", label: "2月微软的New Bing上线后出现精神操控、怂恿用户离婚、推荐用户表达“希特勒万岁”的反犹话", color: "#f97316" },
  { idx: 37, date: "2023/2/6", label: "Bard对事实回答错误导致市值蒸发千亿", color: "#ef4444" },
  { idx: 203, date: "2023/7/22", label: "7 月 LLaMA 2 开源第一次把无限制、无管控的 AI推向公众视野，安全风险从行业圈内话题，变成全网普通人都能看懂、共情的公共焦虑。叠加大量政策解读推文集中流出，网民开始集体讨论就业替代、隐私泄露、算法垄断、监管缺失等长期负面议题，达到前所未有的舆论规模，因此出现第一次整体偏负的情感数据", color: "#34d399" },
  { idx: 293, date: "2023/10/20", label: "AI安全风险集中曝光，大众AI好感跌至全年最低", color: "#ef4444" },
  { idx: 347, date: "2023/12/13", label: "年末行业隐患集中复盘，公众AI好感持续走低", color: "#ef4444" },
];

const rangeEvents = [
  { startIdx: 16, endIdx: 17, color: "#34d399",
    detail: "正值达沃斯年会，全球科技巨头、企业 CEO 集体公开看好生成式 AI（ChatGPT），大量高管在 Twitter 分享 AI 落地愿景，舆论偏向乐观、看好产业前景。同时大量企业宣布将 ChatGPT接入云服务、办公工具。" },
];

const detailEvents = [
  { idx: 142, date: "2023/5/22", color: "#f59e0b",
    detail: "欧盟同步发布《人工智能法案》最终草案，美国、英国相继跟进落地本土AI监管征求意见稿，全球官方层面正式收紧AI行业管控。推特平台AI监管相关话题推文数量二次暴涨，舆论开始从夸赞技术转向探讨技术边界，大众对AI失控、算法垄断、数据隐私泄露的担忧初步浮现，公众针对AI的积极情绪持续走低，乐观舆论进一步降温。" },
];

chartData.forEach(d => {
  d.events = [];
  pointEvents.forEach(ev => {
    if (Math.abs(d.idx - ev.idx) <= 1) {
      d.events.push({ text: ev.label, type: "brief" });
    }
  });
  rangeEvents.forEach(ev => {
    if (d.idx >= ev.startIdx && d.idx <= ev.endIdx) {
      d.events.push({ text: ev.detail, type: "detail" });
    }
  });
  detailEvents.forEach(ev => {
    if (Math.abs(d.idx - ev.idx) <= 1) {
      d.events.push({ text: ev.detail, type: "detail" });
    }
  });
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{ background: "rgba(22,22,33,0.95)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", maxWidth: d.events.some(e => e.type === "detail") ? "360px" : "340px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{d.date}</div>
        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: d.events.length ? "0.5rem" : 0 }}>
          Sentiment: <span style={{ fontWeight: 600, color: "#d4a373" }}>{(d.sentiment * 100).toFixed(1)}%</span>
        </div>
        {d.events.length > 0 && d.events.map((ev, i) => (
          <div key={i} style={{ fontSize: ev.type === "detail" ? "0.75rem" : "0.8125rem", color: "#fbbf24", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.35rem", marginTop: "0.35rem", lineHeight: ev.type === "detail" ? 1.6 : 1.4 }}>
            {"\u{1F4CC}"} {ev.text}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DailySentimentLine() {
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
            domain={[0, 1]}
            tick={{ fill: "#5c5c6e", fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0.5} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <ReferenceArea y1={0.7} y2={1.0} fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.15)" strokeDasharray="4 4" />
          <ReferenceArea y1={0} y2={0.3} fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.15)" strokeDasharray="4 4" />

          <ReferenceArea x1={16} x2={17} fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.2)" strokeDasharray="3 3" />
          <ReferenceLine x={36} stroke="rgba(249,115,22,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={37} stroke="rgba(239,68,68,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={142} stroke="rgba(245,158,11,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={203} stroke="rgba(52,211,153,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={293} stroke="rgba(239,68,68,0.35)" strokeDasharray="4 4" />
          <ReferenceLine x={347} stroke="rgba(239,68,68,0.35)" strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#d4a373"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "#d4a373", stroke: "rgba(212,163,115,0.3)", strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "rgba(34,197,94,0.3)", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Optimistic</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "#d4a373", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Daily Sentiment</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: 20, height: 2, background: "rgba(239,68,68,0.3)", borderRadius: 1 }} /><span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Pessimistic</span></div>
      </div>
    </div>
  );
}
