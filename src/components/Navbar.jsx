import { useState, useEffect } from "react";

const navItems = [
  { label: "Background", href: "#research" },
  { label: "Dataset", href: "#dataset" },
  { label: "Visualization", href: "#viz" },
  { label: "Analysis", href: "#analysis" },
  { label: "Conclusion", href: "#conclusion" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "0.75rem 0" : "1.5rem 0",
          background: scrolled
            ? "rgba(10,10,15,0.65)"
            : "rgba(10,10,15,0.35)",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "blur(16px) saturate(140%)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(160%)" : "blur(16px) saturate(140%)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.04)",
          transition: "all 0.4s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            AI<span style={{ color: "var(--accent)" }}>Sentiment</span>
          </a>

          {/* Desktop Links */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {navItems.map((item, i) => (
              <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {item.label}
                </a>
                {i < navItems.length - 1 && (
                  <span style={{ color: "var(--text-muted)", opacity: 0.4, marginLeft: "2rem" }}>
                    ,
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="mailto:contact@example.com"
            className="desktop-cta"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              padding: "0.5rem 1.25rem",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-sm)",
              color: "var(--accent)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            Get in touch
          </a>

          {/* Mobile Hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              zIndex: 101,
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s ease",
                transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s ease",
                transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(10,10,15,0.75)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: "1.75rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Responsive styles injected via style tag for media queries */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
