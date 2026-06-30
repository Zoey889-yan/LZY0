import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Research from "./components/Research";
import Dataset from "./components/Dataset";
import Visualization from "./components/Visualization";
import Analysis from "./components/Analysis";
import Conclusion from "./components/Conclusion";
import useGSAPAnimations from "./hooks/useGSAPAnimations";

const LiquidEther = lazy(() => import("./components/LiquidEther"));

export default function App() {
  useGSAPAnimations();
  return (
    <div>
      <Navbar />
      <Hero />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.35,
            pointerEvents: "none",
          }}
        >
          <Suspense fallback={null}>
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B497CF", "#6366f1"]}
              resolution={0.35}
              iterationsViscous={12}
              iterationsPoisson={12}
              autoDemo={true}
              autoSpeed={0.3}
              autoIntensity={1.5}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </Suspense>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Research />
          <Dataset />
          <Visualization />
          <Analysis />
          <Conclusion />
        </div>
      </div>
    </div>
  );
}
