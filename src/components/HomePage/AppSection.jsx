import React, { useRef, useEffect } from "react";

import red from "../../assets/apps/red.jpg";
import orange from "../../assets/apps/orange.jpg";
import green from "../../assets/apps/green.jpg";
import blue from "../../assets/apps/blue.jpg";
import lightBlue from "../../assets/apps/LightBlue.jpg";
import purple from "../../assets/apps/purpule.jpg";
import black from "../../assets/apps/black.jpg";


const APPS = [
  {
    id: 0,
    title: "OTHERSIDE",
    category: "GAMES",
    desc: "WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN",
    image: red,
    href: "#",
    size: "small", // col1 row1
  },
  {
    id: 1,
    title: "MADE BY APES",
    category: "INTELLECTUAL PROPERTY",
    desc: "A CLUB FULL OF BUILDERS",
    image: orange,
    href: "#",
    size: "small", // col2 row1
  },
  {
    id: 2,
    title: "BLEVER",
    category: "COLLECTIBLES",
    desc: "AN NFT LAUNCHPAD FOR APECHAIN",
    image: lightBlue,
    href: "#",
    size: "tall", // col3 rows 1-2
  },
  {
    id: 3,
    title: "APE EXPRESS",
    category: "FINANCE",
    desc: "THE ULTIMATE METAVERSE EXPERIENCE",
    image: blue,
    href: "#",
    size: "small", // col4 row1 (partially visible)
  },
  {
    id: 4,
    title: "CAMELOT",
    category: "FINANCE",
    desc: "DECENTRALIZED EXCHANGE",
    image: purple,
    href: "#",
    size: "small", // col1 row2
  },
  {
    id: 5,
    title: "APE PORTAL",
    category: "INFRASTRUCTURE",
    desc: "GET ON APECHAIN",
    image: black,
    href: "#",
    size: "small", // col2 row2
  },
  {
    id: 6,
    title: "CLUTCH MARKETS",
    category: "GAMES, FINANCE",
    desc: "DECENTRALIZED PARLAY PLATFORM ON APECHAIN",
    image: green,
    href: "#",
    size: "small", // col4 row2 (partially visible)
  },
];

// Category → accent color
const CATEGORY_COLOR = {
  "GAMES":                "#e94560",
  "INTELLECTUAL PROPERTY":"#4fc3f7",
  "COLLECTIBLES":         "#b39ddb",
  "FINANCE":              "#f4a261",
  "INFRASTRUCTURE":       "#00b4d8",
  "GAMES, FINANCE":       "#22c55e",
};

export default function AppsSection() {
  const rowRef = useRef(null);

  // Stagger-in animation
  useEffect(() => {
    const cards = rowRef.current?.querySelectorAll(".apps-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 80 * i);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@300;400&display=swap');

        /* ── Section wrapper ── */
        .apps-section {
          
          background: #dce8f0;
          padding: 48px clamp(20px, 4vw, 64px) 64px;
          font-family: 'Barlow Condensed', sans-serif;
        }
        
        .apps-container {
            margin-top: 10rem; /* pull up to overlap with intro section's bottom padding */
            margin-bottom: 10rem; /* negate the pull-up so it doesn't affect spacing with next section */
        }


        /* ── Header ── */
        .apps-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .apps-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .apps-header-icon {
          font-size: 20px;
          line-height: 1;
        }

        .apps-header-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: clamp(15px, 1.6vw, 19px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #111;
          margin: 0;
        }

        .apps-see-all {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #333;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .apps-see-all:hover { color: #000; }

        /* ── Grid row (horizontally scrollable) ── */
        .apps-grid-row {
          display: grid;
          /* 4 equal cols + 1 partial col peeking */
          grid-template-columns: repeat(4, minmax(220px, 1fr)) 180px;
          grid-template-rows: 240px 240px;
          gap: 12px;
          overflow-x: auto;
          overflow-y: visible;
          /* hide scrollbar but keep scroll */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .apps-grid-row::-webkit-scrollbar { display: none; }

        /* ── Card base ── */
        .apps-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: block;
          background: #1a1a2e;
        }

        /* tall card spans 2 rows */
        .apps-card.tall {
          grid-row: 1 / 3;
        }

        /* col positions */
        .apps-card[data-col="1"][data-row="1"] { grid-column: 1; grid-row: 1; }
        .apps-card[data-col="1"][data-row="2"] { grid-column: 1; grid-row: 2; }
        .apps-card[data-col="2"][data-row="1"] { grid-column: 2; grid-row: 1; }
        .apps-card[data-col="2"][data-row="2"] { grid-column: 2; grid-row: 2; }
        .apps-card[data-col="3"]               { grid-column: 3; grid-row: 1 / 3; }
        .apps-card[data-col="4"][data-row="1"] { grid-column: 4; grid-row: 1; }
        .apps-card[data-col="4"][data-row="2"] { grid-column: 4; grid-row: 2; }
        .apps-card[data-col="5"][data-row="1"] { grid-column: 5; grid-row: 1; }
        .apps-card[data-col="5"][data-row="2"] { grid-column: 5; grid-row: 2; }

        /* ── Card image ── */
        .apps-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .apps-card:hover .apps-card-img {
          transform: scale(1.06);
        }

        /* ── Dark gradient overlay ── */
        .apps-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.35) 45%,
            rgba(0,0,0,0.05) 100%
          );
          transition: background 0.3s;
        }
        .apps-card:hover .apps-card-overlay {
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.45) 50%,
            rgba(0,0,0,0.1)  100%
          );
        }

        /* ── Category badge ── */
        .apps-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 10px;
          border-radius: 5px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.18);
          white-space: nowrap;
        }

        /* ── Card text (bottom) ── */
        .apps-card-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 18px 18px 20px;
        }

        .apps-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: 0.03em;
          color: #fff;
          margin: 0 0 4px;
          line-height: 1;
        }

        .apps-card.tall .apps-card-title {
          font-size: clamp(28px, 3vw, 40px);
        }

        .apps-card-desc {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
          margin: 0;
          line-height: 1.5;
        }

        /* ── Hover shine ── */
        .apps-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0);
          transition: border-color 0.3s;
          pointer-events: none;
        }
        .apps-card:hover::after {
          border-color: rgba(255,255,255,0.22);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .apps-grid-row {
            grid-template-columns: repeat(2, minmax(180px, 1fr)) 160px;
            grid-template-rows: 200px 200px;
          }
          .apps-card[data-col="4"],
          .apps-card[data-col="5"] {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .apps-grid-row {
            grid-template-columns: repeat(2, minmax(160px, 1fr));
            grid-template-rows: 180px 180px;
          }
          .apps-card[data-col="3"] {
            grid-column: 1 / 3;
          }
        }
      `}</style>

      <section className="apps-section">
        {/* ── Header ── */}
        <div className="apps-container">
            <div className="apps-header">
          <div className="apps-header-left">
            <span className="apps-header-icon">🚀</span>
            <h2 className="apps-header-title">ApeChain Apps</h2>
          </div>
          <a className="apps-see-all" href="#" aria-label="See all apps">
            SEE ALL APPS ▶
          </a>
        </div>

        {/* ── Grid ── */}
        <div className="apps-grid-row" ref={rowRef}>

          {/* Col 1 — Row 1: OTHERSIDE */}
          <a className="apps-card" href="#" data-col="1" data-row="1" aria-label="Otherside">
            <img className="apps-card-img" src={APPS[0].image} alt="Otherside" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ backgroundColor: CATEGORY_COLOR["GAMES"] }}>
              GAMES
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">OTHERSIDE</h3>
              <p className="apps-card-desc">WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN</p>
            </div>
          </a>

          {/* Col 2 — Row 1: MADE BY APES */}
          <a className="apps-card" href="#" data-col="2" data-row="1" aria-label="Made By Apes">
            <img className="apps-card-img" src={APPS[1].image} alt="Made By Apes" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ backgroundColor: CATEGORY_COLOR["INTELLECTUAL PROPERTY"] }}>
              INTELLECTUAL PROPERTY
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">MADE BY APES</h3>
              <p className="apps-card-desc">A CLUB FULL OF BUILDERS</p>
            </div>
          </a>

          {/* Col 3 — Tall: BLEVER */}
          <a className="apps-card tall" href="#" data-col="3" aria-label="Blever">
            <img className="apps-card-img" src={APPS[2].image} alt="Blever" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ backgroundColor: CATEGORY_COLOR["COLLECTIBLES"] }}>
              COLLECTIBLES
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">BLEVER</h3>
              <p className="apps-card-desc">AN NFT LAUNCHPAD FOR APECHAIN</p>
            </div>
          </a>

          {/* Col 4 — Row 1: APE EXPRESS (partially visible) */}
          <a className="apps-card" href="#" data-col="4" data-row="1" aria-label="Ape Express">
            <img className="apps-card-img" src={APPS[3].image} alt="Ape Express" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ color: CATEGORY_COLOR["FINANCE"] }}>
              FINANCE
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">APE EXPRESS</h3>
              <p className="apps-card-desc">THE ULTIMATE METAVERSE EXPERIENCE</p>
            </div>
          </a>

          {/* Col 1 — Row 2: CAMELOT */}
          <a className="apps-card" href="#" data-col="1" data-row="2" aria-label="Camelot">
            <img className="apps-card-img" src={APPS[4].image} alt="Camelot" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ color: CATEGORY_COLOR["FINANCE"] }}>
              FINANCE
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">CAMELOT</h3>
              <p className="apps-card-desc">DECENTRALIZED EXCHANGE</p>
            </div>
          </a>

          {/* Col 2 — Row 2: APE PORTAL */}
          <a className="apps-card" href="#" data-col="2" data-row="2" aria-label="Ape Portal">
            <img className="apps-card-img" src={APPS[5].image} alt="Ape Portal" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ backgroundColor: CATEGORY_COLOR["INFRASTRUCTURE"] }}>
              INFRASTRUCTURE
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">APE PORTAL</h3>
              <p className="apps-card-desc">GET ON APECHAIN</p>
            </div>
          </a>

          {/* Col 4 — Row 2: CLUTCH MARKETS (partially visible) */}
          <a className="apps-card" href="#" data-col="4" data-row="2" aria-label="Clutch Markets">
            <img className="apps-card-img" src={APPS[6].image} alt="Clutch Markets" />
            <div className="apps-card-overlay" />
            <span className="apps-card-badge" style={{ backgroundColor: CATEGORY_COLOR["GAMES, FINANCE"] }}>
              GAMES, FINANCE
            </span>
            <div className="apps-card-body">
              <h3 className="apps-card-title">CLUTCH MARKETS</h3>
              <p className="apps-card-desc">DECENTRALIZED PARLAY PLATFORM ON APECHAIN</p>
            </div>
          </a>

        </div>
        </div>
        
      </section>
    </>
  );
}