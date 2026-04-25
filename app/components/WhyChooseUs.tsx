"use client";
import { useEffect, useState, useRef, CSSProperties } from "react";

// ─── BREAKPOINT HOOKS ───────────────────────────────────────────────────────

function useIsMobile(bp = 768) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    setV(mq.matches);
    const h = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return v;
}

function useIsTablet(bp = 1024) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    setV(mq.matches);
    const h = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return v;
}

// ─── INTERSECTION OBSERVER HOOK ─────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── STYLES ────────────────────────────────────────────────────────────────

const S = {
  wrapper: {
    position: "relative",
    width: "100%",
    minHeight: "auto",
    padding: "80px 52px",
    background: "#e5ddd1",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    overflow: "hidden",
  } as CSSProperties,

  decoTopLeft: { position: "absolute" as const, top: "-30px", left: "-40px", opacity: 0.12, transform: "rotate(-20deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoTopRight: { position: "absolute" as const, top: "20px", right: "-20px", opacity: 0.10, transform: "rotate(35deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomLeft: { position: "absolute" as const, bottom: "10px", left: "60px", opacity: 0.09, transform: "rotate(10deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomRight: { position: "absolute" as const, bottom: "-20px", right: "40px", opacity: 0.13, transform: "rotate(-30deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidLeft: { position: "absolute" as const, top: "42%", left: "2%", opacity: 0.07, transform: "rotate(50deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidRight: { position: "absolute" as const, top: "38%", right: "2%", opacity: 0.07, transform: "rotate(-45deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,

  container: {
    position: "relative" as const,
    zIndex: 1,
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "60px",
  } as CSSProperties,

  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "12px",
  } as CSSProperties,

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#7a6a4f",
  } as CSSProperties,

  badgeLine: {
    display: "inline-block",
    width: "20px",
    height: "1px",
    background: "#7a6a4f",
  } as CSSProperties,

  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: 500,
    fontStyle: "italic",
    lineHeight: 1.2,
    color: "#2c2416",
    margin: 0,
  } as CSSProperties,

  subheading: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    color: "#7a6a4f",
    margin: 0,
    maxWidth: "600px",
  } as CSSProperties,

  card: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "16px",
    padding: "32px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "12px",
    border: "1px solid rgba(92,122,74,0.15)",
    backdropFilter: "blur(4px)",
  } as CSSProperties,

  iconBox: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    background: "#5c7a4a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  } as CSSProperties,

  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "18px",
    fontWeight: 500,
    color: "#2c2416",
    margin: 0,
  } as CSSProperties,

  cardText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    color: "#7a6a4f",
    margin: 0,
    lineHeight: 1.6,
  } as CSSProperties,
};

// ── SVG COMPONENTS ──

function TeaBranch({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M140 260 C138 200 130 160 110 120 C90 80 70 50 60 20" stroke="#3a5230" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M125 200 C100 185 80 175 55 170" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M128 175 C148 158 162 148 180 142" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M118 148 C96 128 78 120 52 115" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M120 125 C140 108 158 100 178 96" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M55 170 C38 155 32 138 42 120 C52 138 62 152 55 170Z" fill="#5c7a4a"/>
      <path d="M55 170 C65 150 68 132 58 115" stroke="#3a5230" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
      <path d="M180 142 C200 130 210 115 198 98 C185 112 178 128 180 142Z" fill="#5c7a4a"/>
      <path d="M180 142 C172 122 172 106 183 94" stroke="#3a5230" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
      <path d="M52 115 C34 98 30 80 42 62 C54 80 60 98 52 115Z" fill="#4a6840"/>
      <path d="M52 115 C62 94 64 76 53 58" stroke="#3a5230" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
      <path d="M178 96 C198 82 206 66 194 48 C180 63 175 80 178 96Z" fill="#4a6840"/>
      <path d="M178 96 C170 76 170 60 182 46" stroke="#3a5230" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
      <path d="M60 20 C44 8 38 -8 50 -24 C62 -8 68 8 60 20Z" fill="#6b9158"/>
      <path d="M60 20 C68 2 68 -14 57 -28" stroke="#3a5230" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function SingleLeaf({ size = 120, rotate = 0 }: { size?: number; rotate?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M60 110 C20 88 8 55 22 25 C36 8 55 4 72 14 C88 24 94 48 88 68 C80 88 68 105 60 110Z" fill="#5c7a4a"/>
      <path d="M60 110 C56 80 50 55 38 32" stroke="#3a5230" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M54 90 C62 82 72 76 80 72" stroke="#3a5230" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
      <path d="M50 72 C58 62 68 56 78 52" stroke="#3a5230" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
      <path d="M46 55 C52 46 62 40 72 36" stroke="#3a5230" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function TeaSeeds({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="30" rx="8" ry="12" transform="rotate(-20 20 30)" fill="#5c7a4a" opacity="0.8"/>
      <ellipse cx="45" cy="18" rx="7" ry="11" transform="rotate(10 45 18)" fill="#4a6840" opacity="0.8"/>
      <ellipse cx="68" cy="28" rx="7" ry="12" transform="rotate(25 68 28)" fill="#5c7a4a" opacity="0.8"/>
      <ellipse cx="30" cy="58" rx="6" ry="10" transform="rotate(-10 30 58)" fill="#6b9158" opacity="0.7"/>
      <ellipse cx="60" cy="62" rx="7" ry="11" transform="rotate(15 60 62)" fill="#4a6840" opacity="0.7"/>
    </svg>
  );
}

// ── DATA ──

interface WhyCard {
  icon: string;
  title: string;
  description: string;
}

const whyCards: WhyCard[] = [
  {
    icon: "🍃",
    title: "Tenang dalam Setiap Tegukan",
    description:
      "Lupakan stres dan overthinking. Dengan 100% bahan herbal alami tanpa kafein, setiap cangkir Luvia bantu kamu merasa lebih rileks, lebih ringan, dan lebih \"grounded\"—secara alami.",
  },
  {
    icon: "✨",
    title: "Solusi Tepat untuk Setiap Momen",
    description:
      "Lagi hectic? Sulit tidur? Atau perut terasa tidak nyaman? Kami punya varian yang dirancang khusus untuk setiap kebutuhanmu—dari fokus saat kerja hingga tidur lebih nyenyak di malam hari.",
  },
  {
    icon: "🌙",
    title: "Ubah Kebiasaan Jadi Ritual Sehat",
    description:
      "Ini bukan sekadar teh. Ini adalah cara baru menikmati hidup yang lebih seimbang. Bangun rutinitas \"Daily Wellness Ritual\" dan rasakan perubahan kecil yang berdampak besar setiap hari.",
  },
];

// ── COMPONENT ──

export default function WhyChooseUs() {
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);
  const { ref, inView } = useInView(0.12);

  const wrapperStyle: CSSProperties = {
    ...S.wrapper,
    ...(isMobile && { padding: "60px 24px" }),
    ...(isTablet && !isMobile && { padding: "70px 36px" }),
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "24px",
    width: "100%",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)",
  };

  const cardStyle: CSSProperties = {
    ...S.card,
    ...(isMobile && { padding: "24px" }),
  };

  return (
    <div style={wrapperStyle} ref={ref}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ── DEKORASI ── */}
      <div style={S.decoTopLeft}><TeaBranch size={isMobile ? 160 : 300} /></div>
      <div style={S.decoTopRight}><TeaBranch size={isMobile ? 140 : 260} /></div>
      <div style={S.decoBottomLeft}><SingleLeaf size={isMobile ? 100 : 180} rotate={-15} /></div>
      <div style={S.decoBottomRight}><TeaBranch size={isMobile ? 130 : 240} /></div>
      <div style={S.decoMidLeft}><TeaSeeds size={isMobile ? 70 : 120} /></div>
      <div style={S.decoMidRight}><SingleLeaf size={isMobile ? 80 : 140} rotate={40} /></div>

      {/* ── KONTEN UTAMA ── */}
      <div style={{ ...S.container, gap: isMobile ? "40px" : "60px" }}>

        {/* Header */}
        <div
          style={{
            ...S.header,
            animation: inView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            opacity: inView ? undefined : 0,
          }}
        >
          <div style={S.badge}>
            <span style={S.badgeLine} />
            Kenapa Memilih Kami
          </div>
          <h2 style={S.heading}>
            Mengapa Pilih{" "}
            <span style={{ color: "#5c7a4a" }}>Luvia Herbals</span>
          </h2>
          <p style={{ ...S.subheading, textAlign: "center" }}>
            Lebih dari sekadar minuman herbal. Ini adalah perjalanan menuju
            wellness dan keseimbangan hidup yang lebih baik.
          </p>
        </div>

        {/* Cards */}
        <div style={gridStyle}>
          {whyCards.map((item, index) => (
            <div
              key={index}
              style={{
                ...cardStyle,
                animation: inView
                  ? `fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) ${0.18 + index * 0.12}s both`
                  : undefined,
                opacity: inView ? undefined : 0,
              }}
            >
              <div
                style={{
                  ...S.iconBox,
                  animation: inView
                    ? `scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) ${0.32 + index * 0.12}s both`
                    : undefined,
                  opacity: inView ? undefined : 0,
                }}
              >
                {item.icon}
              </div>
              <h3 style={S.cardTitle}>{item.title}</h3>
              <p style={S.cardText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}