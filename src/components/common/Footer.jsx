import { useEffect, useRef } from "react";
import FooterBg from "../../assets/footer-bg.png";

const navData = [
  {
    title: "BUILD ON APECHAIN",
    links: ["DOCS", "MAINNET HUB", "TESTNET HUB", "BLOCK EXPLORER", "APE PORTAL"],
  },
  {
    title: "APECOIN",
    links: ["DISCORD", "TWITTER / X", "OTHERSIDE CALENDAR"],
  },
  {
    title: "APECHAIN",
    links: ["BRIDGE", "RELAY BRIDGE", "THE BLUEPRINT", "TELEGRAM", "TWITTER / X", "BRAND KIT"],
  },
];

const COLORS = ["#00cfff", "#cc44ff", "#00ffaa", "#ffffff", "#ff6688"];
const T = "1s cubic-bezier(0.4, 0, 0.2, 1)";

export default function Footer() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 6 + 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        left: `${Math.random() * 100}%`,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: `footerFloatUp ${6 + Math.random() * 10}s ${Math.random() * 8}s linear infinite`,
        opacity: 0,
      });
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');

        @keyframes footerFloatUp {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        @keyframes footerTitleReveal {
          from { transform: translateY(80px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }

        /* Z-INDEX LAYERS:
           0 → blue base overlay (fades in on hover)
           1 → background image (always visible, above overlay)
           2 → particles
           10 → nav
           5  → hero title
           20 → footer bar
        */

        .ape-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #dce8f0;
          transition: background ${T};
          cursor: default;
        }
        .ape-section:hover { background: #1565FF; }

        /* z-index: 0 — blue gradient, behind the image */
        .ape-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 80%, rgba(90,0,200,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(255,60,120,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 35% 35% at 15% 70%, rgba(0,220,120,0.18) 0%, transparent 55%),
            linear-gradient(175deg, #1a6fff 0%, #1052d6 40%, #0a3a9e 100%);
          opacity: 0;
          transition: opacity ${T};
          pointer-events: none;
        }
        .ape-section:hover .ape-bg-overlay { opacity: 1; }

        /* z-index: 1 — image sits ABOVE the overlay so it's always visible */
        .ape-bg-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 1;
          opacity: 1;
          pointer-events: none;
        }

        /* z-index: 2 — particles above image */
        .ape-particles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity ${T};
        }
        .ape-section:hover .ape-particles { opacity: 1; }

        /* ── Nav ── */
        .ape-nav-col-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          margin-bottom: 14px;
          padding-bottom: 8px;
          color: #1a2a3a;
          border-bottom: 1px solid rgba(26,42,58,0.3);
          transition: color ${T}, border-color ${T};
        }
        .ape-section:hover .ape-nav-col-title {
          color: #fff;
          border-bottom-color: rgba(255,255,255,0.25);
        }

        .ape-nav-link {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #2a4a6a;
          text-decoration: none;
          margin-bottom: 8px;
          transition: color ${T}, letter-spacing 0.2s;
          cursor: pointer;
        }
        .ape-section:hover .ape-nav-link { color: rgba(255,255,255,0.82); }
        .ape-nav-link:hover { color: #00cfff !important; letter-spacing: 0.18em; }

        /* ── Hero title ── */
        .ape-hero-title {
          position: absolute;
          bottom: -8px;
          left: -10px; right: -10px;
          z-index: 5;
          line-height: 0.85;
          pointer-events: none;
          animation: footerTitleReveal 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .ape-hero-title span {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 18vw, 260px);
          text-align: center;
          letter-spacing: -0.01em;
          color: #b0c8d8;
          text-shadow: 0 4px 0 rgba(0,0,0,0.06);
          transition: color ${T}, text-shadow ${T};
        }
        .ape-section:hover .ape-hero-title span {
          color: #fff;
          text-shadow: 0 0 80px rgba(0,150,255,0.4), 0 4px 0 rgba(0,0,0,0.3);
        }

        /* ── Footer bar ── */
        .ape-footer-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 28px;
          border-top: 1px solid rgba(26,42,58,0.15);
          transition: border-color ${T};
        }
        .ape-section:hover .ape-footer-bar { border-top-color: rgba(255,255,255,0.1); }

        .ape-footer-copy {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #5a7a9a;
          transition: color ${T};
        }
        .ape-section:hover .ape-footer-copy { color: rgba(255,255,255,0.6); }

        .ape-footer-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #5a7a9a;
          text-decoration: none;
          margin-left: 18px;
          transition: color ${T};
        }
        .ape-section:hover .ape-footer-link { color: rgba(255,255,255,0.6); }
        .ape-footer-link:hover { color: #fff !important; }
      `}</style>

      <section className="ape-section">

        {/* z-index: 0 — blue gradient behind everything */}
        <div className="ape-bg-overlay" />

        {/* z-index: 1 — image always on top of overlay */}
        <img src={FooterBg} alt="" className="ape-bg-img" />

        {/* z-index: 2 — particles */}
        <div ref={particlesRef} className="ape-particles" />

        {/* z-index: 10 — nav */}
        <nav
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "flex-end",
            padding: "40px 60px 0",
            gap: "80px",
          }}
        >
          {navData.map((col) => (
            <div key={col.title}>
              <h3 className="ape-nav-col-title">{col.title}</h3>
              {col.links.map((link) => (
                <a key={link} href="#" className="ape-nav-link">{link}</a>
              ))}
            </div>
          ))}
        </nav>

        {/* z-index: 5 — giant title */}
        <div className="ape-hero-title">
          <span>APECHAIN</span>
        </div>

        {/* z-index: 20 — footer bar */}
        <div className="ape-footer-bar">
          <span className="ape-footer-copy">© 2026 APE FOUNDATION</span>
          <div>
            <a href="#" className="ape-footer-link">TERMS OF SERVICE</a>
            <a href="#" className="ape-footer-link">PRIVACY NOTICE</a>
          </div>
        </div>

      </section>
    </>
  );
}