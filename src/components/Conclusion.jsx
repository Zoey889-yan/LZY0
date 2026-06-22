import { useInView } from "./useInView";
﻿
const takeaways = [
  "2023 年公众对 AI 的情感总体保持乐观，但随着安全担忧加剧，年末出现了明显的下滑趋势。",
  "Twitter/X 上的 AI 讨论量高度受事件驱动，重大产品发布和争议事件均引发了显著的参与度峰值。",
  "讨论量与情感之间的关系是微妙的：高参与度并不一定与积极情感相关。",
  "尽管总体乐观，但对 AI 安全和监管的持续焦虑使得全年情感波动较大。",
];

export default function Conclusion() {
  const [ref, isVisible] = useInView({ threshold: 0.3 });

  return (
    <section
      id="conclusion"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: [
          "radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)",
          "radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.04) 0%, transparent 60%)",
          "var(--bg-primary)",
        ].join(","),
      }}
      ref={ref}
    >
      {/* Background line decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(99,102,241,0.02) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(99,102,241,0.02) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s ease",
          }}
        >
          <span className="section-label" data-gsap="section-label">总结</span>
          <h2
            className="section-title"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "2rem",
            }}
          >
            Conclusion
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            一整年的 Twitter/X 数据显示，虽然公众对人工智能的态度总体保持乐观，
            但情感对现实世界事件高度敏感，并随 2023 年接近尾声而呈下降趋势。
          </p>
        </div>

        {/* Key Takeaways */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto 4rem auto",
          }}
        >
          {takeaways.map((t, i) => (
            <div
              key={i}
              style={{
                padding: "1.75rem",
                background: "var(--bg-card)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease " + (0.3 + i * 0.12) + "s",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: "0.75rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {t}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s ease 1s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginBottom: "0.5rem",
            }}
          >
            Lu Meiyi &middot; Liang Zhuoyan &middot; Li Zixue
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
            }}
          >
            大数据分析 &middot; AI 情感研究 &middot; 2024
          </div>
        </div>
      </div>
    </section>
  );
}
