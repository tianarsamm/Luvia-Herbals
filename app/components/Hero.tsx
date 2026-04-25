"use client";
import { useState, useEffect, CSSProperties } from "react";

// ─── STYLES ────────────────────────────────────────────────────────────────

const S = {
  heroWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    fontFamily: "'Jost', sans-serif",
  } as CSSProperties,

  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('./images/bg5.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  } as CSSProperties,

  heroOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
  } as CSSProperties,

  // ── NAVBAR ──

  navbar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "32px 52px",
  } as CSSProperties,

  navLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "32px",
    fontWeight: 900,
    color: "#2c2416",
    letterSpacing: "0.04em",
  } as CSSProperties,

  navLogoAccent: {
    color: "#5c7a4a",
  } as CSSProperties,

  navLinks: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    gap: "36px",
    margin: 0,
    padding: 0,
  } as CSSProperties,

  navLinksOpen: {
    display: "flex",
    flexDirection: "column" as const,
    position: "fixed" as const,
    top: 0,
    right: 0,
    height: "100vh",
    width: "260px",
    background: "rgba(245,240,230,0.98)",
    backdropFilter: "blur(12px)",
    zIndex: 50,
    padding: "80px 40px 40px",
    gap: "28px",
    listStyle: "none",
    margin: 0,
    boxShadow: "-8px 0 32px rgba(44,36,22,0.10)",
  } as CSSProperties,

  navLink: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#2c2416",
    textDecoration: "none",
    transition: "color 0.2s",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  } as CSSProperties,

  burgerMenu: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  } as CSSProperties,

  burgerBar: {
    display: "block",
    width: "22px",
    height: "1.5px",
    background: "#2c2416",
    transition: "transform 0.3s, opacity 0.3s",
  } as CSSProperties,

  closeMenu: {
    position: "absolute" as const,
    top: "24px",
    right: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    color: "#2c2416",
  } as CSSProperties,

  menuOverlay: {
    display: "none",
  } as CSSProperties,

  menuOverlayActive: {
    display: "block",
    position: "fixed" as const,
    inset: 0,
    background: "rgba(44,36,22,0.25)",
    zIndex: 40,
  } as CSSProperties,

  // ── HERO SECTION ──

  heroSection: {
    position: "relative",
    zIndex: 2,
    padding: "8rem 52px 0",
    maxWidth: "48%",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-start",
    minHeight: "calc(100vh - 96px)",
  } as CSSProperties,

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#7a6a4f",
    marginBottom: "24px",
  } as CSSProperties,

  heroBadgeLine: {
    display: "inline-block",
    width: "20px",
    height: "1px",
    background: "#7a6a4f",
  } as CSSProperties,

  heroMiniTitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#7a6a4f",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as CSSProperties,

  heroHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(34px, 4.5vw, 52px)",
    fontWeight: 500,
    fontStyle: "italic",
    lineHeight: 1.2,
    color: "#2c2416",
    margin: "0 0 8px 0",
  } as CSSProperties,

  heroHeadingAccent: {
    color: "#5c7a4a",
    fontStyle: "normal",
  } as CSSProperties,

  heroDivider: {
    width: "48px",
    height: "1px",
    background: "#a08c6a",
    margin: "20px 0",
  } as CSSProperties,

  heroSubtitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "11px",
    fontWeight: 200,
    letterSpacing: "0.26em",
    textTransform: "uppercase" as const,
    color: "#2c2416",
    margin: "0 0 40px 0",
  } as CSSProperties,

  ctaGroup: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap" as const,
  } as CSSProperties,

  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "13px 32px",
    background: "#5c7a4a",
    border: "1px solid #5c7a4a",
    color: "#f5f0e6",
    fontFamily: "'Jost', sans-serif",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    borderRadius: "2px",
    transition: "background 0.3s, color 0.3s",
  } as CSSProperties,

  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "13px 32px",
    background: "transparent",
    border: "1px solid #5c7a4a",
    color: "#3a5230",
    fontFamily: "'Jost', sans-serif",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    borderRadius: "2px",
    transition: "background 0.3s, color 0.3s",
  } as CSSProperties,
};

// ─── BREAKPOINTS ───────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    setIsTablet(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isTablet;
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // ── Smooth scroll utility ──
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToSection(id);
  };

  // ── Responsive overrides ──
  const navbarStyle: CSSProperties = {
    ...S.navbar,
    ...(isMobile && { padding: "20px 24px" }),
    ...(isTablet && !isMobile && { padding: "24px 36px" }),
  };

  const heroSectionStyle: CSSProperties = {
    ...S.heroSection,
    ...(isMobile && {
      maxWidth: "100%",
      marginLeft: 0,
      padding: "6rem 24px 48px",
      minHeight: "calc(100vh - 64px)",
    }),
    ...(isTablet && !isMobile && {
      maxWidth: "65%",
      marginLeft: 0,
      padding: "7rem 36px 48px",
    }),
  };

  // Burger bar transforms
  const burgerBar1: CSSProperties = {
    ...S.burgerBar,
    ...(isMenuOpen && { transform: "translateY(6.5px) rotate(45deg)" }),
  };
  const burgerBar2: CSSProperties = {
    ...S.burgerBar,
    ...(isMenuOpen && { opacity: 0, transform: "scaleX(0)" }),
  };
  const burgerBar3: CSSProperties = {
    ...S.burgerBar,
    ...(isMenuOpen && { transform: "translateY(-6.5px) rotate(-45deg)" }),
  };

  const drawerAnimation = isMenuOpen
    ? "slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards"
    : undefined;

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        /* ── Keyframes ── */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Navbar entrance */
        @keyframes navbarDrop {
          from { opacity: 0; transform: translateY(-28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Logo pop */
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.88) translateY(-10px); }
          60%  { transform: scale(1.04) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Nav links stagger */
        @keyframes linkFadeIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Hero badge */
        @keyframes badgeSlideIn {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Heading reveal */
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(32px) skewY(1deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }

        /* Divider expand */
        @keyframes dividerExpand {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }

        /* Subtitle fade */
        @keyframes subtitleFade {
          from { opacity: 0; letter-spacing: 0.4em; }
          to   { opacity: 1; letter-spacing: 0.26em; }
        }

        /* CTA rise */
        @keyframes ctaRise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* BG parallax-in */
        @keyframes bgReveal {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Shimmer on logo accent */
        @keyframes shimmer {
          0%   { filter: brightness(1); }
          50%  { filter: brightness(1.25); }
          100% { filter: brightness(1); }
        }

        .nav-link-item {
          transition: color 0.2s;
        }
        .nav-link-item:hover {
          color: #5c7a4a !important;
        }

        * { -webkit-text-size-adjust: 100%; }
      `}</style>

      <div style={S.heroWrapper}>
        {/* Background image — animated in */}
        <div
          style={{
            ...S.heroBg,
            animation: mounted ? "bgReveal 1.4s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            opacity: mounted ? undefined : 0,
          }}
        />

        {/* Gradient overlay */}
        <div style={S.heroOverlay} />

        {/* Mobile menu dim overlay */}
        {isMobile && (
          <div
            style={
              isMenuOpen
                ? {
                    ...S.menuOverlayActive,
                    animation: "fadeInOverlay 0.25s ease forwards",
                  }
                : S.menuOverlay
            }
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}

        {/* ── NAVBAR ── */}
        <nav
          style={{
            ...navbarStyle,
            animation: mounted
              ? "navbarDrop 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both"
              : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >
          {/* Logo */}
          <div
            style={{
              ...S.navLogo,
              animation: mounted
                ? "logoPop 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both"
                : undefined,
              opacity: mounted ? undefined : 0,
            }}
          >
            luvia
            <span
              style={{
                ...S.navLogoAccent,
                display: "inline-block",
                animation: mounted
                  ? "shimmer 3s ease-in-out 1.2s infinite"
                  : undefined,
              }}
            >
              {" "}herbals
            </span>
          </div>

          {/* Desktop nav links */}
          {!isMobile && (
            <ul style={S.navLinks}>
              {[
                { href: "#hero",      label: "Beranda" },
                { href: "#products",  label: "Produk" },
                { href: "#testimoni", label: "Testimoni" },
                { href: "#footer",    label: "Kontak" },
              ].map((item, i) => (
                <li
                  key={item.href}
                  style={{
                    animation: mounted
                      ? `linkFadeIn 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.09}s both`
                      : undefined,
                    opacity: mounted ? undefined : 0,
                  }}
                >
                  <button
                    className="nav-link-item"
                    style={S.navLink}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile burger */}
          {isMobile && (
            <button
              style={S.burgerMenu}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMenuOpen}
            >
              <span style={burgerBar1} />
              <span style={burgerBar2} />
              <span style={burgerBar3} />
            </button>
          )}
        </nav>

        {/* Mobile drawer menu */}
        {isMobile && isMenuOpen && (
          <ul
            style={{ ...S.navLinksOpen, animation: drawerAnimation }}
            role="navigation"
            aria-label="Menu navigasi"
          >
            <button style={S.closeMenu} onClick={toggleMenu} aria-label="Tutup menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <li style={{ marginBottom: "8px" }}>
              <span style={{ ...S.navLogo, fontSize: "22px", display: "block" }}>
                luvia<span style={S.navLogoAccent}> herbals</span>
              </span>
            </li>

            <li aria-hidden="true">
              <div style={{ width: "100%", height: "1px", background: "rgba(44,36,22,0.12)", margin: "0 0 4px" }} />
            </li>

            {[
              { href: "#hero",      label: "Beranda" },
              { href: "#products",  label: "Produk" },
              { href: "#testimoni", label: "Testimoni" },
              { href: "#footer",    label: "Kontak" },
            ].map((item) => (
              <li key={item.href}>
                <button
                  className="nav-link-item"
                  style={{
                    ...S.navLink,
                    fontSize: "13px",
                    letterSpacing: "0.28em",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#5c7a4a",
                    flexShrink: 0,
                  }} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* ── HERO ── */}
        <section id="hero" style={heroSectionStyle}>

          {/* Mini badge */}
          <p style={{
            ...S.heroMiniTitle,
            animation: mounted
              ? "badgeSlideIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both"
              : undefined,
            opacity: mounted ? undefined : 0,
          }}>
            <span style={S.heroBadgeLine} />
            Luvia Herbals
          </p>

          {/* Heading line 1 */}
          <h1
            style={{
              ...S.heroHeading,
              overflow: "hidden",
              animation: mounted
                ? "headingReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.62s both"
                : undefined,
              opacity: mounted ? undefined : 0,
            }}
          >
            Harmoni Alam untuk
            <br />
            Jiwa yang{" "}
            <span style={S.heroHeadingAccent}>Tenang</span>
          </h1>

          {/* Divider */}
          <div
            style={{
              ...S.heroDivider,
              animation: mounted
                ? "dividerExpand 0.7s cubic-bezier(0.22,1,0.36,1) 0.95s both"
                : undefined,
              width: mounted ? undefined : 0,
              opacity: mounted ? undefined : 0,
            }}
          />

          {/* Tagline */}
          <p
            style={{
              ...S.heroSubtitle,
              animation: mounted
                ? "subtitleFade 0.8s cubic-bezier(0.22,1,0.36,1) 1.05s both"
                : undefined,
              opacity: mounted ? undefined : 0,
            }}
          >
            Your Daily Reset
          </p>

          {/* CTA buttons */}
          <div style={S.ctaGroup}>
            <button
              style={{
                ...S.ctaPrimary,
                animation: mounted
                  ? "ctaRise 0.65s cubic-bezier(0.22,1,0.36,1) 1.18s both"
                  : undefined,
                opacity: mounted ? undefined : 0,
              }}
              onClick={() => scrollToSection("products")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#3a5230";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#3a5230";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#5c7a4a";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#5c7a4a";
              }}
            >
              Lihat Produk
            </button>

            <button
              style={{
                ...S.ctaSecondary,
                animation: mounted
                  ? "ctaRise 0.65s cubic-bezier(0.22,1,0.36,1) 1.28s both"
                  : undefined,
                opacity: mounted ? undefined : 0,
              }}
              onClick={() => scrollToSection("footer")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#5c7a4a";
                (e.currentTarget as HTMLButtonElement).style.color = "#f5f0e6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#3a5230";
              }}
            >
              Hubungi Kami
            </button>
          </div>
        </section>
      </div>
    </>
  );
}