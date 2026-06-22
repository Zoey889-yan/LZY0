import DailyTweetChart from "../charts/DailyTweetChart";
import TweetCountChart from "../charts/TweetCountChart";
import SentimentChart from "../charts/SentimentChart";
import CombinedChart from "../charts/CombinedChart";
import DailySentimentLine from "../charts/DailySentimentLine";
import DailyTweetSentimentCombined from "../charts/DailyTweetSentimentCombined";
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

export default function Visualization() {

  return (
    <section id="viz" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" data-gsap="section-label">可视化证据</span>
          <h2 className="section-title" data-gsap="section-title">Data Visualization</h2>
          <p className="section-subtitle" data-gsap="section-subtitle" style={{ margin: "0 auto" }}>
            基于真实 Twitter/X 数据的六个交互式图表，揭示了 2023 年全年 AI 讨论的动态变化。
          </p>
        </div>

        {/* Chart 1 - Daily Tweet Line */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Daily Tweet Volume — Full Year Overview</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  2023 年全年 365 天中，每日与 AI 相关的推文数量。虚线标记了年度日均 <strong style={{ color: "var(--accent)" }}>10,151</strong> 条推文的平均水平。峰值反映了事件驱动的参与热度，低谷则显示了相对平静的时期。
                </p>
              </div>
              <DailyTweetChart />
            </div>
          </BorderGlow>
        </div>

        {/* Chart 2 - Daily Sentiment Score */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Daily Sentiment Score — Full Year Overview</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  2023 年全年 365 天的每日情感得分。图表显示了一个明显的 <strong style={{ color: "#ef4444" }}>下降趋势</strong>，从 1 月的约 98% 下降到 10 月的约 11%。绿色和红色区域分别标记了乐观和悲观的范围。
                </p>
              </div>
              <DailySentimentLine />
            </div>
          </BorderGlow>
        </div>

        {/* Chart 3 - Daily Tweet & Sentiment Combined */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Daily Tweet Volume & Sentiment — Dual View</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  每日推文数量（柱状图，左侧坐标轴）叠加情感得分（折线图，右侧坐标轴）。下半年出现的分化趋势表明，推文量保持高位，而公众情感持续下降。
                </p>
              </div>
              <DailyTweetSentimentCombined />
            </div>
          </BorderGlow>
        </div>

        {/* Chart 4 - Monthly Tweet Count */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>AI Tweet Volume — Monthly Average</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  按月份统计的每日 AI 相关推文数量。<strong style={{ color: "var(--accent)" }}>1 月</strong>的推文量最高，由 2023 年初达到顶峰的 ChatGPT 现象驱动。呈现高低月交替的双峰模式。
                </p>
              </div>
              <TweetCountChart />
            </div>
          </BorderGlow>
        </div>

        {/* Chart 5 - Sentiment Over Time */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Sentiment Score Over Time</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  周均情感得分。一个明显的 <strong style={{ color: "#ef4444" }}>下降轨迹</strong>从 1 月的约 78% 下降至 12 月的约 32%——这是全年公众舆论的剧烈转变。
                </p>
              </div>
              <SentimentChart />
            </div>
          </BorderGlow>
        </div>

        {/* Chart 6 - Combined Analysis */}
        <div  style={{ marginBottom: "3rem" }}>
          <BorderGlow {...glowProps} borderRadius={16} glowIntensity={0.5}>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Tweet Volume & Sentiment — Combined View</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  双轴图表叠加显示了月度推文量（柱状图）与平均情感（折线图）。下半年的分化趋势揭示了尽管讨论热度持续，但公众负面情绪不断增长。
                </p>
              </div>
              <CombinedChart />
            </div>
          </BorderGlow>
        </div>


      </div>
    </section>
  );
}
