"use client";
import { CSSProperties, useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

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

interface ProductDetail {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  image: string;
  benefits: string[];
  insight: string;
}

const productsData: ProductDetail[] = [
  {
    id: "calm-chamomile",
    name: "Calm Chamomile",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Best Seller",
    tagColor: "#5c7a4a",
    accentColor: "#d4a84b",
    image: "/images/1.JPEG",
    benefits: [
      "Membantu relaksasi tubuh & pikiran",
      "Mengurangi stres ringan & overthinking",
      "Membantu tidur lebih nyenyak",
      "Cocok untuk malam hari (before sleep ritual)",
    ],
    insight: "Varian ini adalah signature calming tea — paling cocok untuk pengguna yang ingin \"slow down\" setelah hari yang padat.",
  },
  {
    id: "sleep-lavender",
    name: "Sleep Lavender",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Top Pick",
    tagColor: "#7a5c9a",
    accentColor: "#b89fd4",
    image: "/images/2.JPEG",
    benefits: [
      "Membantu mengatasi insomnia ringan",
      "Menenangkan sistem saraf",
      "Membantu tidur lebih cepat & berkualitas",
      "Mengurangi kecemasan sebelum tidur",
    ],
    insight: "Lebih fokus ke kualitas tidur dibanding Calm Chamomile. Cocok untuk pekerja yang sering begadang.",
  },
  {
    id: "stress-relief",
    name: "Stress Relief",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "New",
    tagColor: "#c0622a",
    accentColor: "#e8a87c",
    image: "/images/3.JPEG",
    benefits: [
      "Mengurangi stres & kecemasan",
      "Membantu menenangkan emosi",
      "Meningkatkan mood & fokus ringan",
      "Cocok diminum saat jam kerja / hectic time",
    ],
    insight: "Varian ini punya rasa lebih \"rich & aromatik\", cocok untuk pengganti kopi saat butuh tenang tapi tetap fokus.",
  },
  {
    id: "digest-detox",
    name: "Digest & Detox",
    price: "Rp 75.000",
    priceNote: "/ Kotak",
    tag: "Wellness",
    tagColor: "#3a7a6a",
    accentColor: "#7ec8b8",
    image: "/images/4.JPEG",
    benefits: [
      "Melancarkan pencernaan",
      "Mengurangi kembung & begah",
      "Membantu detoks alami tubuh",
      "Memberikan efek segar & ringan",
    ],
    insight: "Ini adalah varian wellness + body care, cocok diminum setelah makan atau saat tubuh terasa \"berat\".",
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

const S = {
  page: { position: "relative", width: "100%", minHeight: "100vh", padding: "80px 52px", background: "#e5ddd1", display: "flex", flexDirection: "column" as const, alignItems: "center", overflow: "hidden" } as CSSProperties,
  decoTopLeft: { position: "absolute" as const, top: "-30px", left: "-40px", opacity: 0.12, transform: "rotate(-20deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoTopRight: { position: "absolute" as const, top: "20px", right: "-20px", opacity: 0.10, transform: "rotate(35deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomLeft: { position: "absolute" as const, bottom: "10px", left: "60px", opacity: 0.09, transform: "rotate(10deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoBottomRight: { position: "absolute" as const, bottom: "-20px", right: "40px", opacity: 0.13, transform: "rotate(-30deg) scaleX(-1)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidLeft: { position: "absolute" as const, top: "42%", left: "2%", opacity: 0.07, transform: "rotate(50deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  decoMidRight: { position: "absolute" as const, top: "38%", right: "2%", opacity: 0.07, transform: "rotate(-45deg)", pointerEvents: "none" as const, zIndex: 0 } as CSSProperties,
  imageSection: { display: "flex", flexDirection: "column" as const, gap: "16px" } as CSSProperties,
  mainImage: { width: "100%", aspectRatio: "1 / 1", borderRadius: "12px", objectFit: "cover" as const, background: "#a0b888", border: "1px solid rgba(92,122,74,0.15)" } as CSSProperties,
  contentSection: { display: "flex", flexDirection: "column" as const, gap: "28px" } as CSSProperties,
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#7a6a4f", marginBottom: "8px" } as CSSProperties,
  badgeLine: { display: "inline-block", width: "20px", height: "1px", background: "#7a6a4f" } as CSSProperties,
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 500, fontStyle: "italic", lineHeight: 1.2, color: "#2c2416", margin: 0 } as CSSProperties,
  priceTag: { display: "inline-flex", alignItems: "center", gap: "8px" } as CSSProperties,
  price: { fontFamily: "'Jost', sans-serif", fontSize: "28px", fontWeight: 600, color: "#2c2416" } as CSSProperties,
  priceNote: { fontFamily: "'Jost', sans-serif", fontSize: "14px", fontWeight: 300, color: "#7a6a4f" } as CSSProperties,
  divider: { height: "1px", background: "rgba(92,122,74,0.15)" } as CSSProperties,
  section: { display: "flex", flexDirection: "column" as const, gap: "12px" } as CSSProperties,
  sectionTitle: { fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.22em", color: "#7a6a4f", margin: 0 } as CSSProperties,
  benefitsList: { margin: 0, padding: "0 0 0 20px", listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "10px" } as CSSProperties,
  benefitItem: { fontFamily: "'Jost', sans-serif", fontSize: "14px", fontWeight: 300, color: "#7a6a4f", lineHeight: 1.6, position: "relative" as const } as CSSProperties,
  benefitDot: { position: "absolute" as const, left: "-16px", top: "8px", width: "4px", height: "4px", borderRadius: "50%", background: "#5c7a4a" } as CSSProperties,
  insight: { padding: "32px", borderRadius: "12px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(92,122,74,0.15)", backdropFilter: "blur(4px)", fontFamily: "'Jost', sans-serif", fontSize: "14px", fontWeight: 300, color: "#7a6a4f", lineHeight: 1.6, margin: 0 } as CSSProperties,
  ctaSection: { display: "flex", flexDirection: "column" as const, gap: "12px", marginTop: "16px" } as CSSProperties,
  primaryBtn: { padding: "16px 32px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "'Jost', sans-serif", cursor: "pointer", transition: "all 0.3s ease" } as CSSProperties,
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);

  // Mount-based animations (page load)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const product = productsData.find((p) => p.id === productId);
  const [igHovered, setIgHovered] = useState(false);
  const [shopeeHovered, setShopeeHovered] = useState(false);

  const pageStyle: CSSProperties = {
    ...S.page,
    ...(isMobile && { padding: "48px 20px 60px" }),
    ...(isTablet && !isMobile && { padding: "60px 36px" }),
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
    gap: isMobile ? "32px" : "60px",
    alignItems: "start",
  };

  const imageSectionStyle: CSSProperties = {
    ...S.imageSection,
    ...(isMobile && { maxWidth: "420px", width: "100%", margin: "0 auto" }),
  };

  const insightStyle: CSSProperties = {
    ...S.insight,
    ...(isMobile && { padding: "20px" }),
  };

  const showBackBtn = isMobile || isTablet;

  if (!product) {
    return (
      <div style={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", background: "#e5ddd1" } as CSSProperties}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2c2416", fontStyle: "italic" }}>
          Produk tidak ditemukan
        </h1>
        <button
          onClick={() => router.push("/")}
          style={{ padding: "10px 20px", borderRadius: "12px", border: "none", background: "#5c7a4a", color: "#fff", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" } as CSSProperties}
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes imagePop {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes benefitSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes btnRise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Decorations */}
      <div style={S.decoTopLeft}><TeaBranch size={isMobile ? 160 : 300} /></div>
      <div style={S.decoTopRight}><TeaBranch size={isMobile ? 140 : 260} /></div>
      <div style={S.decoBottomLeft}><SingleLeaf size={isMobile ? 100 : 180} rotate={-15} /></div>
      <div style={S.decoBottomRight}><TeaBranch size={isMobile ? 130 : 240} /></div>
      <div style={S.decoMidLeft}><TeaSeeds size={isMobile ? 70 : 120} /></div>
      <div style={S.decoMidRight}><SingleLeaf size={isMobile ? 80 : 140} rotate={40} /></div>

      {/* Back button */}
      {showBackBtn && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1200px",
            marginBottom: "16px",
            animation: mounted ? "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a6a4f", padding: "4px 0" } as CSSProperties}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Kembali
          </button>
        </div>
      )}

      {/* Main content */}
      <div style={containerStyle}>

        {/* ── Gambar — slide in from left on desktop, fade up on mobile ── */}
        <div
          style={{
            ...imageSectionStyle,
            animation: mounted
              ? isMobile
                ? "fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both"
                : "slideInLeft 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both"
              : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                ...S.mainImage,
                animation: mounted ? "imagePop 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both" : undefined,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: product.tagColor,
                color: "#fff",
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                animation: mounted ? "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both" : undefined,
                opacity: mounted ? undefined : 0,
              } as CSSProperties}
            >
              {product.tag}
            </div>
          </div>
        </div>

        {/* ── Konten Detail — slide in from right on desktop ── */}
        <div
          style={{
            ...S.contentSection,
            ...(isMobile && { gap: "20px" }),
            animation: mounted
              ? isMobile
                ? "fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both"
                : "slideInRight 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both"
              : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >

          {/* Badge + Judul */}
          <div style={{ animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both" : undefined, opacity: mounted ? undefined : 0 }}>
            <div style={S.badge}>
              <span style={S.badgeLine} />
              Premium Collection
            </div>
            <h1 style={S.title}>
              <span style={{ color: "#5c7a4a" }}>{product.name}</span>
            </h1>
          </div>

          {/* Harga */}
          <div
            style={{
              ...S.priceTag,
              animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both" : undefined,
              opacity: mounted ? undefined : 0,
            }}
          >
            <span style={{ ...S.price, ...(isMobile && { fontSize: "24px" }) }}>{product.price}</span>
            <span style={S.priceNote}>{product.priceNote}</span>
          </div>

          <div style={{ ...S.divider, animation: mounted ? "fadeUp 0.4s ease 0.45s both" : undefined, opacity: mounted ? undefined : 0 }} />

          {/* Benefits */}
          <div style={{ ...S.section, animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both" : undefined, opacity: mounted ? undefined : 0 }}>
            <h3 style={S.sectionTitle}>Manfaat Utama</h3>
            <ul style={S.benefitsList}>
              {product.benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  style={{
                    ...S.benefitItem,
                    animation: mounted
                      ? `benefitSlide 0.5s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.08}s both`
                      : undefined,
                    opacity: mounted ? undefined : 0,
                  }}
                >
                  <span style={S.benefitDot} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Insight */}
          <div
            style={{
              ...S.section,
              animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.72s both" : undefined,
              opacity: mounted ? undefined : 0,
            }}
          >
            <h3 style={S.sectionTitle}>Insight Produk</h3>
            <div style={insightStyle}>
              <p style={{ margin: 0, fontFamily: "'Jost', sans-serif", fontSize: "14px", fontWeight: 300, color: "#7a6a4f", lineHeight: 1.6 }}>
                {product.insight}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              ...S.ctaSection,
              ...(isTablet && !isMobile && { flexDirection: "row", gap: "12px" }),
            }}
          >
            {/* Instagram */}
            <a
              href="https://www.instagram.com/luvia.herbals?igsh=ejd3amE3MXB1a3pp"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIgHovered(true)}
              onMouseLeave={() => setIgHovered(false)}
              style={{
                ...S.primaryBtn,
                flex: isTablet && !isMobile ? 1 : undefined,
                background: igHovered ? "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" : "rgba(255,255,255,0.6)",
                color: igHovered ? "#fff" : "#2c2416",
                border: "1px solid rgba(225,48,108,0.4)",
                backdropFilter: "blur(4px)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transform: igHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: igHovered ? "0 12px 28px rgba(225,48,108,0.25)" : "0 6px 16px rgba(225,48,108,0.08)",
                ...(isMobile && { padding: "14px 24px", fontSize: "12px" }),
                animation: mounted ? "btnRise 0.6s cubic-bezier(0.22,1,0.36,1) 0.82s both" : undefined,
                opacity: mounted ? undefined : 0,
              } as CSSProperties}
            >
              <span style={{ fontSize: "18px" }}></span>
              Pesan via Instagram
            </a>

            {/* Shopee */}
            <a
              href="https://id.shp.ee/VSN231nn"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setShopeeHovered(true)}
              onMouseLeave={() => setShopeeHovered(false)}
              style={{
                ...S.primaryBtn,
                flex: isTablet && !isMobile ? 1 : undefined,
                background: shopeeHovered ? "#EE4D2D" : "rgba(255,255,255,0.6)",
                color: shopeeHovered ? "#fff" : "#2c2416",
                border: "1px solid rgba(238,77,45,0.4)",
                backdropFilter: "blur(4px)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transform: shopeeHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: shopeeHovered ? "0 12px 28px rgba(238,77,45,0.25)" : "0 6px 16px rgba(238,77,45,0.08)",
                ...(isMobile && { padding: "14px 24px", fontSize: "12px" }),
                animation: mounted ? "btnRise 0.6s cubic-bezier(0.22,1,0.36,1) 0.92s both" : undefined,
                opacity: mounted ? undefined : 0,
              } as CSSProperties}
            >
              <span style={{ fontSize: "18px" }}></span>
              Pesan via Shopee
            </a>
          </div>

          {/* Info Tambahan */}
          <div
            style={{
              padding: isMobile ? "20px" : "32px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(92,122,74,0.15)",
              backdropFilter: "blur(4px)",
              borderLeft: `4px solid ${product.accentColor}`,
              animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 1.0s both" : undefined,
              opacity: mounted ? undefined : 0,
            } as CSSProperties}
          >
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#7a6a4f", lineHeight: 1.8, margin: 0 } as CSSProperties}>
              <strong style={{ color: "#2c2416" }}>✨ Kualitas Terjamin</strong> — Produk original dengan bahan pilihan. Tersedia di Instagram & Shopee dengan promo menarik setiap bulannya.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}