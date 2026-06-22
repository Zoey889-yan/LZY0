import { useInView } from "./useInView";
import BorderGlow from "./BorderGlow";
﻿
const directions = [
  "2023 年人工智能技术的飞速发展",
  "社交媒体已成为公众情感表达的首要平台",
  "Twitter/X 为了解公众对 AI 态度变化提供了实时视角",
];

const questions = [
  { id: "Q1", text: "AI 相关的讨论量如何随时间变化？" },
  { id: "Q2", text: "公众对 AI 的情感倾向发生了怎样的转变？" },
  { id: "Q3", text: "讨论量与情感倾向之间是否存在相关性？" },
  { id: "Q4", text: "关键事件如何影响公众对 AI 的态度？" },
];

export default function Research() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <section id="research" className="section">
      <div className="container" ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Analysis Direction */}
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
            <span className="section-label" data-gsap="section-label">研究背景</span>
            <h2 className="section-title" data-gsap="section-title">Analysis Direction</h2>
            <p className="section-subtitle" data-gsap="section-subtitle">
              本研究调查了在 AI 发展的关键一年中，社交媒体平台上围绕人工智能的公众话语演变。
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {directions.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      minWidth: "1.5rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Research Questions */}
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.2s" }}>
            <span className="section-label" data-gsap="section-label">核心问题</span>
            <h2 className="section-title" data-gsap="section-title">Research Questions</h2>
            <p className="section-subtitle" data-gsap="section-subtitle">
              四个引导性问题驱动着本次对 AI 情感动态的探究。
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.125rem 1.5rem",
                    background: "linear-gradient(135deg, var(--accent-dim), transparent)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-glow)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      padding: "0.25rem 0.5rem",
                      border: "1px solid var(--accent)",
                      borderRadius: "4px",
                    }}
                  >
                    {q.id}
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                    {q.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
