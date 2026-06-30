import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "./useTypewriter";

export default function Hero() {
  const videoRef = useRef(null);
  const prevX = useRef(0);
  const targetTime = useRef(0);
  const animFrame = useRef(null);

  const { displayed, done } = useTypewriter(
    "Exploring how the public discusses AI on Twitter/X, tracking sentiment shifts across 2023."
  );

  // Desktop mouse scrubbing — throttled via rAF for smooth, efficient seeking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let ticking = false;

    const onMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;
      if (Math.abs(delta) < 3) return;
      targetTime.current += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime.current = Math.max(0, Math.min(targetTime.current, video.duration));
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          video.currentTime = targetTime.current;
          ticking = false;
        });
      }
    };

    const onLoaded = () => {
      targetTime.current = video.duration * 0.3;
      video.currentTime = targetTime.current;
    };

    window.addEventListener("mousemove", onMouseMove);
    video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Mobile autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playIfMobile = () => {
      if (window.innerWidth < 1024) {
        video.play().catch(() => {});
      }
    };
    playIfMobile();
    window.addEventListener("resize", playIfMobile);
    return () => window.removeEventListener("resize", playIfMobile);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* Video Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right bottom",
          }}
        />
      </div>

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(180deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.65) 50%, rgba(10,10,15,0.92) 100%),
            radial-gradient(ellipse at 70% 40%, rgba(99,102,241,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Animated grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="container"
        data-gsap="hero-container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <div
          data-gsap="hero-title"
          style={{}}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "1.5rem",
            }}
          >
            Big Data Analysis &middot; Social Media Research
          </div>
        </div>

        <h1
          data-gsap="hero-title"
          data-gsap-child
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            maxWidth: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Social Media{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            &quot;Doom Sentiment&quot;
          </span>{" "}
          Toward Artificial Intelligence
        </h1>

        <div
          data-gsap="hero-subtitle"
        >
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "640px",
              margin: "0 auto 2.5rem auto",
              lineHeight: 1.7,
              minHeight: "2.5em",
            }}
          >
            {displayed}
            {!done && (
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  background: "var(--accent)",
                  verticalAlign: "text-bottom",
                  marginLeft: "2px",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </p>
        </div>

        <div
          data-gsap="hero-cta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <a
            href="#research"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.75rem 2rem",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "var(--radius-sm)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5558e4";
              e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explore the Research
          </a>
          <a
            href="#viz"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.75rem 2rem",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-primary)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-primary)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View Visualizations
          </a>
        </div>

        <div
          data-gsap="hero-cta"
          style={{
            fontSize: "0.9375rem",
            color: "var(--text-muted)",
          }}
        >
          By{" "}
          <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Lu Meiyi
          </span>
          ,{" "}
          <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Liang Zhuoyan
          </span>
          ,{" "}
          <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Li Zixue
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-gsap="hero-scroll"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, var(--text-muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}
