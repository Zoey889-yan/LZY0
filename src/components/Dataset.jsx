import { useInView } from "./useInView";
﻿import { stats } from "../data/sentimentData";
import BorderGlow from "./BorderGlow";

const glowProps = {
  colors: ["#6366f1", "#818cf8", "#a78bfa"],
  backgroundColor: "#161621",
  borderRadius: 12,
  glowRadius: 24,
  glowIntensity: 0.6,
  edgeSensitivity: 28,
  coneSpread: 20,
  fillOpacity: 0.3,
};

const schema = [
  { column: "Date", type: "DATE", description: "日历日期（2023-01-01 至 2023-12-31）" },
  { column: "AI_Tweets_Count", type: "INTEGER", description: "当日发布的 AI 相关推文数量" },
  { column: "Sentiment_Score", type: "FLOAT", description: "聚合情感得分（0.0 = 最负面，1.0 = 最正面）" },
];

export default function Dataset() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <section id="dataset" className="section">
      <div className="container" ref={ref}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <span className="section-label" data-gsap="section-label">数据基础</span>
          <h2 className="section-title" data-gsap="section-title">Dataset Overview</h2>
          <p className="section-subtitle" data-gsap="section-subtitle" style={{ margin: "0 auto" }}>
            基于一整年的 Twitter/X 数据构建，捕捉了 2023 年围绕人工智能的公众讨论与情感变化。
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Time Span", value: "365 Days", sub: "Jan 01 - Dec 31, 2023", delay: 0 },
            { label: "Data Source", value: "Twitter / X", sub: "Social media platform", delay: 0.1 },
            { label: "Total Records", value: "365", sub: "Daily aggregated rows", delay: 0.2 },
            { label: "Total Tweets", value: (stats.totalTweets / 1_000_000).toFixed(1) + "M", sub: "AI-related posts collected", accent: true, delay: 0.3 },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease " + s.delay + "s",
              }}
            >
              <BorderGlow {...glowProps} borderRadius={16} glowIntensity={s.accent ? 0.9 : 0.5}>
                <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", color: s.accent ? "var(--accent)" : "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    {s.sub}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>

        {/* Schema Table */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5} edgeSensitivity={22}>
            <div style={{ padding: "2rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.25rem", textAlign: "center" }}>
                数据结构
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", borderBottom: "1px solid rgba(99,102,241,0.3)" }}>列名</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", borderBottom: "1px solid rgba(99,102,241,0.3)" }}>类型</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", borderBottom: "1px solid rgba(99,102,241,0.3)" }}>描述</th>
                  </tr>
                </thead>
                <tbody>
                  {schema.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-primary)", borderBottom: i < schema.length - 1 ? "1px solid var(--border-color)" : "none" }}>{row.column}</td>
                      <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", borderBottom: i < schema.length - 1 ? "1px solid var(--border-color)" : "none" }}>{row.type}</td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "var(--text-secondary)", borderBottom: i < schema.length - 1 ? "1px solid var(--border-color)" : "none" }}>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

