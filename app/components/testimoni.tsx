"use client";
import { useEffect, useState, useRef, CSSProperties } from "react";

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

function useInView(threshold = 0.12) {
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

// ─── STYLES ─────────────────────────────────────────────────────────────────

const S = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#e5ddd1",
    position: "relative",
    overflow: "hidden",
  } as CSSProperties,

  decoTopLeft: { position: "absolute" as const, top: "-30px", left: "-40px", opacity: 0.12, transform: "rotate(-20deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoTopRight: { position: "absolute" as const, top: "20px", right: "-20px", opacity: 0.10, transform: "rotate(35deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomLeft: { position: "absolute" as const, bottom: "10px", left: "60px", opacity: 0.09, transform: "rotate(10deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomRight: { position: "absolute" as const, bottom: "-20px", right: "40px", opacity: 0.13, transform: "rotate(-30deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidLeft: { position: "absolute" as const, top: "42%", left: "2%", opacity: 0.07, transform: "rotate(50deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidRight: { position: "absolute" as const, top: "38%", right: "2%", opacity: 0.07, transform: "rotate(-45deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,

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

  testimonialsContainer: {
    width: "100%",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
    paddingBottom: "8px",
  } as CSSProperties,

  testimonialsTrack: {
    display: "flex",
    gap: "16px",
    padding: "4px",
  } as CSSProperties,

  testimonialCard: {
    flex: "0 0 320px",
    scrollSnapAlign: "start",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(92,122,74,0.15)",
    backdropFilter: "blur(4px)",
    display: "flex",
    flexDirection: "row" as const,
    gap: "16px",
    alignItems: "flex-start",
    textAlign: "left",
  } as CSSProperties,

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#5c7a4a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontWeight: 500,
    flexShrink: 0,
  } as CSSProperties,

  cardRight: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    flex: 1,
  } as CSSProperties,

  name: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2c2416",
    margin: 0,
  } as CSSProperties,

  stars: {
    color: "#d4a84b",
    fontSize: "11px",
    letterSpacing: "1px",
    margin: 0,
  } as CSSProperties,

  testimonialText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    color: "#7a6a4f",
    lineHeight: 1.6,
    margin: 0,
  } as CSSProperties,
};

// ── SVG COMPONENTS ──────────────────────────────────────────────────────────

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

// ── DATA ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string;
  avatar: string;
  product: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { name: "Sari", avatar: "S", product: "Calm Chamomile", text: "Luvia Chamomile bantu banget buat tidur lebih nyenyak. Stres kerja hilang setelah minum teh ini setiap malam." },
  { name: "Ahmad", avatar: "A", product: "Stress Relief", text: "Sebagai pekerja kantoran, Stress Relief jadi temen setia saya. Mood lebih stabil dan fokus kerja meningkat." },
  { name: "Maya", avatar: "M", product: "Sleep Lavender", text: "Sleep Lavender luar biasa! Insomnia saya berkurang drastis. Sekarang bisa tidur 8 jam penuh tanpa bangun-bangun." },
  { name: "Rizki", avatar: "R", product: "Digest & Detox", text: "Digest & Detox bikin perut saya lebih sehat. Tidak lagi kembung setelah makan berat. Terima kasih Luvia!" },
  { name: "Nina", avatar: "N", product: "Calm Chamomile", text: "Calm Chamomile cocok banget buat ritual sebelum tidur. Pikiran lebih tenang dan tubuh lebih rileks." },
  { name: "Budi", avatar: "B", product: "Stress Relief", text: "Sebagai freelancer, Stress Relief bantu saya mengatasi deadline yang menumpuk. Efeknya langsung terasa." },
  { name: "Lina", avatar: "L", product: "Sleep Lavender", text: "Sleep Lavender bikin tidur saya lebih berkualitas. Bangun pagi lebih fresh dan energik." },
  { name: "Dika", avatar: "D", product: "Digest & Detox", text: "Digest & Detox jadi solusi untuk masalah pencernaan saya. Sekarang makan apa saja tanpa khawatir." },
  { name: "Putri", avatar: "P", product: "Calm Chamomile", text: "Calm Chamomile bantu saya mengatasi overthinking. Hidup jadi lebih balance dan peaceful." },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function TestimoniPage() {
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);
  const { ref: headerRef, inView: headerInView } = useInView(0.12);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.08);
  const { ref: footerRef, inView: footerInView } = useInView(0.08);

  const containerStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: isMobile ? "60px 24px 0" : isTablet ? "70px 36px 0" : "80px 52px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "40px" : "60px",
  };

  const cardWidth = isMobile ? "82vw" : "360px";

  const productLabelStyle: CSSProperties = {
    fontFamily: "'Jost', sans-serif",
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "#5c7a4a",
    margin: "0 0 4px",
  };

  const footerGridStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    padding: isMobile ? "40px 24px 32px" : isTablet ? "48px 36px 36px" : "52px 52px 40px",
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "1fr 1fr"
      : "1.2fr 1fr 1fr 1.4fr",
    gap: isMobile ? "32px" : "48px",
    alignItems: "start",
  };

  const footerBottomStyle: CSSProperties = {
    width: "100%",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: isMobile ? "16px 24px" : "20px 52px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: isMobile ? "6px" : 0,
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box" as const,
    textAlign: isMobile ? "center" : "left",
  };

  return (
    <div style={S.page}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
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
      <div id="testimoni" style={containerStyle}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            animation: headerInView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            opacity: headerInView ? undefined : 0,
          }}
        >
          <div style={S.badge}>
            <span style={S.badgeLine} />
            Testimoni Pelanggan
          </div>
          <h2 style={S.heading}>
            Apa Kata Mereka Tentang{" "}
            <span style={{ color: "#5c7a4a" }}>Luvia Herbals</span>
          </h2>
          <p style={{ ...S.subheading, textAlign: "center" }}>
            Ribuan orang telah merasakan manfaat teh herbal kami. Ini cerita mereka.
          </p>
        </div>

        {/* Cards scroll track */}
        <div
          ref={cardsRef}
          style={{
            ...S.testimonialsContainer,
            animation: cardsInView ? "fadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both" : undefined,
            opacity: cardsInView ? undefined : 0,
          }}
        >
          <div style={S.testimonialsTrack}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  ...S.testimonialCard,
                  flex: `0 0 ${cardWidth}`,
                  animation: cardsInView
                    ? `cardSlideIn 0.55s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.07}s both`
                    : undefined,
                  opacity: cardsInView ? undefined : 0,
                }}
              >
                <div style={S.avatar}>{testimonial.avatar}</div>
                <div style={S.cardRight}>
                  <p style={S.name}>{testimonial.name}</p>
                  <p style={S.stars}>★★★★★</p>
                  <p style={productLabelStyle}>{testimonial.product}</p>
                  <p style={S.testimonialText}>{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        id="footer"
        ref={footerRef}
        style={{
          width: "100%",
          background: "#2c2416",
          color: "#e5ddd1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: isMobile ? "60px" : "80px",
          animation: footerInView ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" : undefined,
          opacity: footerInView ? undefined : 0,
        } as CSSProperties}
      >
        {/* Main footer content */}
        <div style={footerGridStyle}>

          {/* Kolom 1 — Brand */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "16px",
              animation: footerInView ? "slideInLeft 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both" : undefined,
              opacity: footerInView ? undefined : 0,
            }}
          >
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontStyle: "italic", fontWeight: 500, color: "#e5ddd1", margin: "0 0 4px" } as CSSProperties}>
                Luvia Herbals
              </h2>
              <div style={{ width: "36px", height: "2px", background: "#5c7a4a", borderRadius: "2px" } as CSSProperties} />
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#a89880", lineHeight: 1.8, margin: 0 } as CSSProperties}>
              Produk herbal alami dari bahan pilihan — chamomile, lavender, peppermint — untuk keseimbangan tubuh dan pikiran. Tanpa kafein, tanpa bahan kimia.
            </p>
          </div>

          {/* Kolom 2 — Kontak */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "16px",
              animation: footerInView ? "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.3s both" : undefined,
              opacity: footerInView ? undefined : 0,
            }}
          >
            <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#7a6a4f", margin: 0 } as CSSProperties}>
              Kontak Kami
            </h3>
            {[
              { label: "Instagram", value: "luvia.herbals" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontWeight: 400, color: "#7a6a4f", margin: 0, letterSpacing: "0.10em", textTransform: "uppercase" as const }}>
                  {label}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#c8bba8", margin: 0, lineHeight: 1.6 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Kolom 3 — Produk */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "16px",
              animation: footerInView ? "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.4s both" : undefined,
              opacity: footerInView ? undefined : 0,
            }}
          >
            <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#7a6a4f", margin: 0 } as CSSProperties}>
              Produk
            </h3>
            {["Calm Chamomile", "Sleep Lavender", "Stress Relief", "Digest & Detox"].map((item) => (
              <p key={item} style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#a89880", margin: 0, lineHeight: 1.4, cursor: "pointer" } as CSSProperties}>
                {item}
              </p>
            ))}
          </div>

          {/* Kolom 4 — Google Maps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "12px",
              animation: footerInView ? "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.5s both" : undefined,
              opacity: footerInView ? undefined : 0,
            }}
          >
            <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#7a6a4f", margin: 0 } as CSSProperties}>
              Lokasi Kami
            </h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#a89880", margin: 0, lineHeight: 1.6 } as CSSProperties}>
              Surakarta, Jawa Tengah, Indonesia<br />
              <span style={{ color: "#7a6a4f", fontSize: "11px" }}>Pengiriman ke seluruh Indonesia</span>
            </p>
            <div style={{ width: "100%", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" } as CSSProperties}>
              <iframe
                title="Lokasi Luvia Herbals"
                src="https://www.google.com/maps?q=-7.5502678,110.8545932&hl=id&z=17&output=embed"
                width="100%"
                height="160"
                style={{ border: 0, display: "block", filter: "grayscale(30%) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={footerBottomStyle}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 300, color: "#5a5040", margin: 0 } as CSSProperties}>
            © {new Date().getFullYear()} Luvia Herbals. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 300, color: "#5a5040", margin: 0 } as CSSProperties}>
            Tersedia di Instagram & Shopee
          </p>
        </div>
      </footer>
    </div>
  );
}