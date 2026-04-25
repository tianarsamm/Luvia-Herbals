"use client";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { useRouter } from "next/navigation";

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

interface ProductCard {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  benefits: string[];
  image: string;
}

const products: ProductCard[] = [
  {
    id: "calm-chamomile",
    name: "Calm Chamomile",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Best Seller",
    tagColor: "#5c7a4a",
    accentColor: "#d4a84b",
    benefits: ["Relaksasi tubuh & pikiran", "Mengurangi stres & overthinking", "Tidur lebih nyenyak"],
    image: "/images/1.jpeg",
  },
  {
    id: "sleep-lavender",
    name: "Sleep Lavender",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Top Pick",
    tagColor: "#7a5c9a",
    accentColor: "#b89fd4",
    benefits: ["Mengatasi insomnia ringan", "Menenangkan sistem saraf", "Tidur lebih cepat & berkualitas"],
    image: "/images/2.jpeg",
  },
  {
    id: "stress-relief",
    name: "Stress Relief",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "New",
    tagColor: "#c0622a",
    accentColor: "#e8a87c",
    benefits: ["Mengurangi stres & kecemasan", "Menenangkan emosi", "Meningkatkan mood & fokus"],
    image: "/images/3.jpeg",
  },
  {
    id: "digest-detox",
    name: "Digest & Detox",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Wellness",
    tagColor: "#3a7a6a",
    accentColor: "#7ec8b8",
    benefits: ["Melancarkan pencernaan", "Mengurangi kembung & begah", "Detoks alami tubuh"],
    image: "/images/4.jpeg",
  },
];

function TeaBranch({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M140 260 C138 200 130 160 110 120 C90 80 70 50 60 20" stroke="#3a5230" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M125 200 C100 185 80 175 55 170" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M128 175 C148 158 162 148 180 142" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M118 148 C96 128 78 120 52 115" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M120 125 C140 108 158 100 178 96" stroke="#3a5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M55 170 C38 155 32 138 42 120 C52 138 62 152 55 170Z" fill="#5c7a4a"/>
      <path d="M180 142 C200 130 210 115 198 98 C185 112 178 128 180 142Z" fill="#5c7a4a"/>
      <path d="M52 115 C34 98 30 80 42 62 C54 80 60 98 52 115Z" fill="#4a6840"/>
      <path d="M178 96 C198 82 206 66 194 48 C180 63 175 80 178 96Z" fill="#4a6840"/>
      <path d="M60 20 C44 8 38 -8 50 -24 C62 -8 68 8 60 20Z" fill="#6b9158"/>
    </svg>
  );
}

function SingleLeaf({ size = 120, rotate = 0 }: { size?: number; rotate?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M60 110 C20 88 8 55 22 25 C36 8 55 4 72 14 C88 24 94 48 88 68 C80 88 68 105 60 110Z" fill="#5c7a4a"/>
      <path d="M60 110 C56 80 50 55 38 32" stroke="#3a5230" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function ProductCardItem({ product, isMobile, inView, index }: { product: ProductCard; isMobile: boolean; inView: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const showPanel = isMobile ? expanded : hovered;

  return (
    <>
      <style>{`
        .prod-card-${product.id} {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          border: 1px solid rgba(92,122,74,0.15);
          transition: transform 0.4s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.4s ease;
        }
        @keyframes cardPopIn {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className={`prod-card-${product.id}`}
        style={{
          boxShadow: showPanel ? "0 24px 48px rgba(44,36,22,0.20)" : "0 8px 24px rgba(44,36,22,0.10)",
          transform: showPanel && !isMobile ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          animation: inView
            ? `cardPopIn 0.65s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.1}s both`
            : undefined,
          opacity: inView ? undefined : 0,
        }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        onClick={() => isMobile && setExpanded((p) => !p)}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${product.image}')`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "#a0b888", transition: "transform 0.6s ease", transform: showPanel && !isMobile ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,6,0.80) 0%, rgba(15,12,6,0.10) 50%, transparent 100%)", transition: "opacity 0.4s ease", opacity: showPanel ? 0 : 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,6,0.92) 0%, rgba(15,12,6,0.60) 50%, rgba(15,12,6,0.15) 100%)", transition: "opacity 0.4s ease", opacity: showPanel ? 1 : 0 }} />

        {/* Tag */}
        <div style={{ position: "absolute", top: "12px", left: "12px", padding: isMobile ? "4px 9px" : "5px 12px", borderRadius: "999px", background: product.tagColor, color: "#fff", fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "8px" : "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, zIndex: 3, whiteSpace: "nowrap" as const }}>
          {product.tag}
        </div>

        {/* Default state */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "16px 14px" : "22px 20px", zIndex: 3, transition: "opacity 0.3s ease, transform 0.3s ease", opacity: showPanel ? 0 : 1, transform: showPanel ? "translateY(6px)" : "translateY(0)", pointerEvents: "none" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "15px" : "20px", fontWeight: 500, fontStyle: "italic", color: "#fff", margin: "0 0 3px", lineHeight: 1.2 }}>{product.name}</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "11px" : "13px", fontWeight: 300, color: product.accentColor, margin: 0 }}>
            {product.price}<span style={{ fontSize: "10px", color: "rgba(255,255,255,0.50)", marginLeft: "3px" }}>{product.priceNote}</span>
          </p>
        </div>

        {/* Expanded panel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? "12px" : "18px", transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25,0.8,0.25,1)", opacity: showPanel ? 1 : 0, transform: showPanel ? "translateY(0)" : "translateY(12px)", pointerEvents: showPanel ? "auto" : "none" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "14px" : "18px", fontWeight: 500, fontStyle: "italic", color: "#fff", margin: "0 0 1px", lineHeight: 1.15 }}>{product.name}</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "10px" : "12px", color: product.accentColor, margin: "0 0 8px", fontWeight: 300 }}>
            {product.price}<span style={{ fontSize: "9px", color: "rgba(255,255,255,0.45)", marginLeft: "3px" }}>{product.priceNote}</span>
          </p>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.18)", marginBottom: "8px" }} />
          <ul style={{ margin: "0 0 10px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: isMobile ? "4px" : "5px" }}>
            {product.benefits.map((b) => (
              <li key={b} style={{ fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "9px" : "11px", fontWeight: 300, color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", gap: "6px", lineHeight: 1.3 }}>
                <span style={{ width: isMobile ? "4px" : "5px", height: isMobile ? "4px" : "5px", borderRadius: "50%", background: product.accentColor, flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>
          <PanelButton accentColor={product.accentColor} isMobile={isMobile} onClick={(e) => { e.stopPropagation(); router.push(`/products/${product.id}`); }} />
        </div>
      </div>
    </>
  );
}

function PanelButton({ accentColor, isMobile, onClick }: { accentColor: string; isMobile: boolean; onClick: (e: React.MouseEvent) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ width: "100%", padding: isMobile ? "7px 0" : "9px 0", borderRadius: "8px", border: `1.5px solid ${accentColor}`, background: hov ? accentColor : "transparent", color: hov ? "#fff" : accentColor, fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "9px" : "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, cursor: "pointer", transition: "background 0.22s ease, color 0.22s ease" }}
    >
      Pesan Sekarang →
    </button>
  );
}

const S = {
  section: { position: "relative", width: "100%", padding: "80px 52px", background: "#e5ddd1", display: "flex", flexDirection: "column" as const, alignItems: "center", overflow: "hidden" } as CSSProperties,
  decoTopLeft: { position: "absolute" as const, top: "-30px", left: "-40px", opacity: 0.12, transform: "rotate(-20deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoTopRight: { position: "absolute" as const, top: "20px", right: "-20px", opacity: 0.10, transform: "rotate(35deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomLeft: { position: "absolute" as const, bottom: "10px", left: "60px", opacity: 0.09, transform: "rotate(10deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomRight: { position: "absolute" as const, bottom: "-20px", right: "40px", opacity: 0.13, transform: "rotate(-30deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidLeft: { position: "absolute" as const, top: "42%", left: "2%", opacity: 0.07, transform: "rotate(50deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidRight: { position: "absolute" as const, top: "38%", right: "2%", opacity: 0.07, transform: "rotate(-45deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  container: { position: "relative" as const, zIndex: 1, width: "100%", maxWidth: "1200px", display: "flex", flexDirection: "column" as const, gap: "52px" } as CSSProperties,
  header: { display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "12px", textAlign: "center" as const } as CSSProperties,
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" as const, color: "#7a6a4f" } as CSSProperties,
  badgeLine: { display: "inline-block", width: "20px", height: "1px", background: "#7a6a4f" } as CSSProperties,
  heading: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, fontStyle: "italic", color: "#2c2416", margin: 0, lineHeight: 1.2 } as CSSProperties,
  intro: { fontFamily: "'Jost', sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#7a6a4f", maxWidth: "560px", margin: "0 auto" } as CSSProperties,
};

export default function Products() {
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);
  const { ref: headerRef, inView: headerInView } = useInView(0.15);
  const { ref: gridRef, inView: gridInView } = useInView(0.08);

  const sectionStyle: CSSProperties = {
    ...S.section,
    ...(isMobile && { padding: "60px 20px" }),
    ...(isTablet && !isMobile && { padding: "70px 36px" }),
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: isMobile ? "14px" : "20px",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
  };

  return (
    <section id="products" style={sectionStyle}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={S.decoTopLeft}><TeaBranch size={isMobile ? 160 : 300} /></div>
      <div style={S.decoTopRight}><TeaBranch size={isMobile ? 140 : 260} /></div>
      <div style={S.decoBottomLeft}><SingleLeaf size={isMobile ? 100 : 180} rotate={-15} /></div>
      <div style={S.decoBottomRight}><TeaBranch size={isMobile ? 130 : 240} /></div>
      <div style={S.decoMidLeft}><SingleLeaf size={isMobile ? 70 : 120} rotate={50} /></div>
      <div style={S.decoMidRight}><SingleLeaf size={isMobile ? 80 : 140} rotate={40} /></div>

      <div style={{ ...S.container, gap: isMobile ? "32px" : "52px" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            ...S.header,
            animation: headerInView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            opacity: headerInView ? undefined : 0,
          }}
        >
          <div style={S.badge}>
            <span style={S.badgeLine} />
            Produk Unggulan
            <span style={S.badgeLine} />
          </div>
          <h2 style={S.heading}>
            Rangkaian Teh Herbal untuk{" "}
            <span style={{ color: "#5c7a4a" }}>Setiap Kebutuhan</span>
          </h2>
          <p style={S.intro}>
            Temukan varian teh yang dirancang untuk membantu kamu tetap rileks,
            tidur nyenyak, tetap fokus saat bekerja, atau menjaga pencernaan tetap nyaman.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} style={gridStyle}>
          {products.map((product, index) => (
            <ProductCardItem
              key={product.id}
              product={product}
              isMobile={isMobile}
              inView={gridInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}