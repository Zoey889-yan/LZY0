import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
const EASE_SLOW = "power4.out";

export default function useGSAPAnimations() {
  useEffect(() => {
    // Defer to avoid blocking first paint
    requestAnimationFrame(() => {
      // Cache all DOM queries once
      const heroTitle = document.querySelector("[data-gsap='hero-title']");
      const heroSubtitle = document.querySelector("[data-gsap='hero-subtitle']");
      const heroCtas = document.querySelectorAll("[data-gsap='hero-cta']");
      const heroScroll = document.querySelector("[data-gsap='hero-scroll']");
      const sectionLabels = document.querySelectorAll("[data-gsap='section-label']");
      const sectionTitles = document.querySelectorAll("[data-gsap='section-title']");
      const subtitles = document.querySelectorAll("[data-gsap='section-subtitle']");
      const staggerContainers = document.querySelectorAll("[data-gsap='stagger']");
      const timelineItems = document.querySelectorAll("[data-gsap='timeline-item']");
      const gridCards = document.querySelectorAll("[data-gsap='grid-card']");

      // === HERO OPENING ===
      const heroTL = gsap.timeline({ defaults: { ease: EASE_SLOW } });

      if (heroTitle) {
        heroTL.fromTo(
          heroTitle,
          { clipPath: "inset(0 50% 0 50%)", y: 80, opacity: 0 },
          { clipPath: "inset(0 0% 0 0%)", y: 0, opacity: 1, duration: 1.4 },
        );
      }

      if (heroSubtitle) {
        heroTL.fromTo(
          heroSubtitle,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.7",
        );
      }

      if (heroCtas.length) {
        heroTL.fromTo(
          heroCtas,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.5",
        );
      }

      if (heroScroll) {
        heroTL.fromTo(
          heroScroll,
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          "-=0.3",
        );
      }

      // === SCROLLTRIGGER: Section labels ===
      sectionLabels.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: EASE });
          },
        });
      });

      // === SCROLLTRIGGER: Section titles ===
      sectionTitles.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { clipPath: "inset(0 100% 0 0)", x: -20, opacity: 0 },
              { clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1, duration: 1.1, ease: EASE_SLOW },
            );
          },
        });
      });

      // === SCROLLTRIGGER: Subtitles ===
      subtitles.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE });
          },
        });
      });

      // === SCROLLTRIGGER: Stagger containers ===
      staggerContainers.forEach((container) => {
        const children = container.children;
        if (!children.length) return;
        ScrollTrigger.create({
          trigger: container,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              children,
              { y: 40, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: EASE },
            );
          },
        });
      });

      // === SCROLLTRIGGER: Timeline items ===
      timelineItems.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: EASE });
          },
        });
      });

      // === SCROLLTRIGGER: Grid cards ===
      gridCards.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: i * 0.12, ease: EASE });
          },
        });
      });

      // Refresh ScrollTrigger after all setup
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
