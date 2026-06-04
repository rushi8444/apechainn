import { useState, useEffect } from "react";

const navLinks = [
  { label: "EXPLORE", active: true },
  { label: "LEARN", active: false },
  { label: "BUILD", active: false },
  { label: "BRIDGE", active: false },
];

export default function ApechainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --light-gray: #c8a84b;
          --pure-white: #e4c56a;
          --dark: #0a0b0d;
          --nav-height: 64px;
        }

        body {
          font-family: 'Barlow', sans-serif;
          background: transparent;
          min-height: 200vh;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          z-index: 1000;
          transition: all 0.4s ease;
          background : transparent;
         }


        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 0;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-box {
          border: 2.5px solid #fff;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .logo-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(200,168,75,0.06);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .logo:hover .logo-box::before { opacity: 1; }

        .logo-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 1.45rem;
          letter-spacing: 0.12em;
          color: #fff;
          line-height: 1;
          text-transform: uppercase;
        }

        /* ── Nav Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
        }

        .nav-links li a {
          position: relative;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          padding: 6px 14px;
          border: 1.5px solid transparent;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
          cursor: pointer;
          display: block;
          white-space: nowrap;
        }

        .nav-links li a:hover {
          color: #fff;
        }

        .nav-links li a.active {
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.04);
          letter-spacing: 0.16em;
        }

        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.3s ease;
        }

        .nav-links li a:hover::after {
          width: calc(100% - 20px);
        }

        .nav-links li a.active::after {
          display: none;
        }

        /* ── Right CTA ── */
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .btn-connect {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--dark);
          background: linear-gradient(135deg, var(--pure-white) 0%, var(--light-gray) 100%);
          border: none;
          padding: 8px 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: filter 0.25s, transform 0.2s;
        }

        .btn-connect:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }

        .btn-connect:active {
          transform: translateY(0);
        }

        /* ── Hamburger (mobile) ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .mobile-menu {
          display: none;
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: rgba(6,7,9,0.97);
          border-bottom: 1px solid rgba(200,168,75,0.15);
          backdrop-filter: blur(16px);
          padding: 16px 0 24px;
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 999;
          pointer-events: none;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu a {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          padding: 12px 28px;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          cursor: pointer;
        }

        .mobile-menu a:hover,
        .mobile-menu a.active {
          color: #fff;
          border-left-color: var(--light-gray);
          background: rgba(200,168,75,0.06);
        }

        

        /* ── Decorative ring overlay ── */
        .nav-rings {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.07;
        }

        .nav-rings svg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          height: 420px;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }

        /* demo hero */
        .demo-hero {
          height: 100vh;
          background: 
            radial-gradient(ellipse at 30% 60%, rgba(120,90,20,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 20%, rgba(30,40,60,0.4) 0%, transparent 55%),
            linear-gradient(160deg, #0d0e10 0%, #0a0b0d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
        }

        .demo-hero h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 8vw, 6rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
        }

        .demo-hero h1 span {
          color: var(--light-gray);
        }

        .demo-hero p {
          font-family: 'Barlow', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Decorative rings from the original design */}
        <div className="nav-rings">
          <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[60, 100, 145, 195, 250, 310].map((r) => (
              <circle key={r} cx="210" cy="210" r={r} stroke="white" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="nav-inner">
          {/* Logo */}
          <a className="logo" onClick={() => setActiveLink(null)} href="/">
            <div className="logo-box">
              <span className="logo-text">APECHAIN</span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map(({ label }) => (
              <li key={label}>
                <a
                  className={activeLink === label ? "active" : ""}
                  onClick={() => setActiveLink(label)}
                  href="#"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="">
            <button > </button>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ label }) => (
          <a
            key={label}
            className={activeLink === label ? "active" : ""}
            onClick={() => { setActiveLink(label); setMenuOpen(false); }}
            href="#"
          >
            {label}
          </a>
        ))}
        
      </div>
    </>
  );
}