import { stats, keyEvents } from "../data/sentimentData";
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

const trendColors = { up: "var(--accent-green)", mixed: "var(--accent-amber)", down: "var(--accent-red)" };
const trendLabels = { up: "Positive Impact", mixed: "Mixed Impact", down: "Negative Impact" };

export default function Analysis() {
  return (
    <section id="analysis" className="section">
      <div className="container" data-gsap="stagger">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" data-gsap="section-label">深度分析</span>
          <h2 className="section-title" data-gsap="section-title">Data Analysis</h2>
          <p className="section-subtitle" data-gsap="section-subtitle" style={{ margin: "0 auto" }}>
            解析在 2023 年定义 Twitter/X 上 AI 话语的关键事件、情感驱动因素和相关关系。
          </p>
        </div>

        {/* Statistical Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
          {[
            { label: "Total Tweets", value: (stats.totalTweets/1e6).toFixed(1)+"M", delay: 0.1 },
            { label: "Avg Daily Tweets", value: stats.avgDailyTweets.toLocaleString(), delay: 0.2 },
            { label: "Avg Sentiment", value: (stats.avgSentiment*100).toFixed(1)+"%", sub: "Range: "+(stats.sentimentRange.min*100).toFixed(0)+"% - "+(stats.sentimentRange.max*100).toFixed(0)+"%", accent: true, delay: 0.3 },
            { label: "Peak Month", value: stats.peakTweetMonth, delay: 0.4 },
          ].map((s, i) => (
            <div key={i} data-gsap="grid-card" style={{}}>
              <BorderGlow {...glowProps} borderRadius={16} glowIntensity={s.accent ? 0.8 : 0.5}>
                <div style={{ padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{s.label}</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", color: s.accent ? "#a78bfa" : "var(--text-primary)" }}>{s.value}</div>
                  {s.sub && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{s.sub}</div>}
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>

        {/* Key Events Timeline */}
        <div style={{ marginBottom: "4rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>关键事件影响分析</h3>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginBottom: "2.5rem", maxWidth: "600px" }}>
            2023 年塑造 Twitter/X 公众对话的六个关键时刻。
          </p>
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "0.5rem", top: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg, var(--accent), rgba(99,102,241,0.1))" }} />
            {keyEvents.map((ev, i) => (
              <div key={i} data-gsap="timeline-item" style={{ position: "relative", paddingBottom: i < keyEvents.length - 1 ? "2rem" : 0 }}>
                <div style={{ position: "absolute", left: "-2rem", top: "0.4rem", width: "10px", height: "10px", borderRadius: "50%", background: trendColors[ev.trend], boxShadow: "0 0 12px "+trendColors[ev.trend] }} />
                <BorderGlow {...glowProps} borderRadius={14} glowIntensity={0.4} edgeSensitivity={22}>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--accent)", whiteSpace: "nowrap" }}>{ev.date}</span>
                      <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>{ev.title}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: trendColors[ev.trend]+"15", color: trendColors[ev.trend], border: "1px solid "+trendColors[ev.trend]+"30" }}>{trendLabels[ev.trend]}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{ev.description}</p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5} data-gsap="grid-card">
            <div style={{ padding: "1.75rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>情感极值</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.125rem", background: "rgba(34,197,94,0.06)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <div><div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.15rem" }}>最高情感</div><div style={{ fontSize: "0.8125rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{stats.peakSentimentDay.date}</div></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.35rem", fontWeight: 700, color: "var(--accent-green)" }}>{(stats.peakSentimentDay.sentiment*100).toFixed(1)}%</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.125rem", background: "rgba(239,68,68,0.06)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <div><div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.15rem" }}>最低情感</div><div style={{ fontSize: "0.8125rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{stats.lowestSentimentDay.date}</div></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.35rem", fontWeight: 700, color: "var(--accent-red)" }}>{(stats.lowestSentimentDay.sentiment*100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5} data-gsap="grid-card">
            <div style={{ padding: "1.75rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>关键洞察</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ padding: "0.875rem 1.125rem", background: "var(--accent-dim)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-glow)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>总体趋势</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.6 }}>情感从 1 月的 <strong>{(stats.sentimentRange.max*100).toFixed(0)}%</strong> 下降到 10 月的 <strong>{(stats.sentimentRange.min*100).toFixed(0)}%</strong>——从热情到担忧的剧烈转变。</div>
                </div>
                <div style={{ padding: "0.875rem 1.125rem", background: "rgba(245,158,11,0.06)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,158,11,0.15)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>讨论量模式</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.6 }}>推文量呈现高低月交替的双峰模式，这可能反映了 Twitter API 采样方法而非实际参与度的波动。</div>
                </div>
                <div style={{ padding: "0.875rem 1.125rem", background: "rgba(34,197,94,0.06)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>年均值</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.6 }}><strong>{(stats.avgSentiment*100).toFixed(0)}%</strong> 的平均情感掩盖了鲜明的对比：2023 年初高度乐观（~78%），而年末情感跌至约 32%。</div>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}