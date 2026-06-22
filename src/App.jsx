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
              mouseForce={20}
              cursorSize={195}
              resolution={0.5}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
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
