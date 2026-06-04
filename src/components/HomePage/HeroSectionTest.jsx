import React, { useEffect, useRef } from "react";

// Temp placeholder images — replace with actual imports from assets:
import spotlightBgLeft from "../../assets/intro_leeft.jpg";
import clutchCard from "../../assets/games/clutch.jpg";
import apeBgRight from "../../assets/intro_right.jpg";


export default function IntroSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const els = sectionRef.current?.querySelectorAll("[data-anim]");
        if (!els) return;
        els.forEach((el, i) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(28px)";
            setTimeout(() => {
                el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 120 * i);
        });
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

        .intro-section {
          position: relative;
          min-height: 100vh;
          background: #dce8f0;
          display: flex;
          align-items: center;
          // overflow: hidden;
          font-family: 'Barlow', sans-serif;
          //changed
          //  margin-top: -48px;
          // padding-top: 48px;
          margin-top: -120px;   /* ← was -48px */
  padding-top: 120px;
        }

/* ✅ CHANGE 2 — frosted blur overlay at the very top of the section */
        .intro-top-blur {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 160px;
          z-index: 10;
          pointer-events: none;
          /* fades from the bg colour down to transparent */
          background: linear-gradient(
            to bottom,
            rgba(220, 232, 240, 1)   0%,
            rgba(220, 232, 240, 0.7) 40%,
            rgba(220, 232, 240, 0)   100%
          );
          /* blurs whatever is behind (the dark hero section above) */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          /* mask so the blur tapers off going downward */
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 100%);
        }

        .intro-bottom-blur {
  position: absolute;
  bottom: 0;          /* ← was top: 0 */
  left: 0;
  right: 0;
  height: 160px;
  z-index: 10;
  pointer-events: none;

  background: linear-gradient(
    to top,           /* ← was to bottom */
    rgba(220, 232, 240, 1)   0%,
    rgba(220, 232, 240, 0.7) 40%,
    rgba(220, 232, 240, 0)   100%
  );

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  -webkit-mask-image: linear-gradient(to top, black 0%, black 30%, transparent 100%); /* ← was to bottom */
  mask-image: linear-gradient(to top, black 0%, black 30%, transparent 100%);         /* ← was to bottom */
}

        /* ── Background image scraps ── */
        .intro-bg-left {
          position: absolute;
          top: 0; left: 0;
          width: 28%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          pointer-events: none;
          user-select: none;
          
        }

        .intro-bg-right {
          position: absolute;
          top: 0; right: 0;
          width: 26%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          pointer-events: none;
          user-select: none;
        }

        /* ── Inner layout ── */
        .intro-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 80px 48px;
          gap: 48px;
        }

        /* ── LEFT COLUMN ── */
        .intro-left {
          flex: 0 0 52%;
          max-width: 52%;
        }

        .intro-badge {
          display: inline-flex;
          align-items: center;
          gap: 0;
          margin-bottom: 20px;
        }

        .badge-apechain {
          background: #fff;
          border: 2px solid #111;
          padding: 5px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #111;
        }

        .badge-spotlight {
          background: #111;
          border: 2px solid #111;
          padding: 5px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
        }

        .intro-headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(52px, 6.5vw, 88px);
          line-height: 0.92;
          text-transform: uppercase;
          color: #111;
          margin: 0 0 28px 0;
          letter-spacing: -0.01em;
        }

        .intro-body {
          color: #222;
          font-size: 15px;
          line-height: 1.65;
          margin-bottom: 16px;
          max-width: 560px;
        }

        .intro-body strong {
          font-weight: 700;
          color: #111;
        }

        .intro-tagline {
          color: #222;
          font-size: 15px;
          line-height: 1.65;
          margin-bottom: 36px;
        }

        /* ── CTA Buttons ── */
        .intro-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 30px;
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border: 2px solid #111;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          text-decoration: none;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: #111;
        }

        .btn-outline:hover {
          background: #111;
          color: #fff;
        }

        .btn-filled {
          background: #fff;
          color: #111;
        }

        .btn-filled:hover {
          background: #111;
          color: #fff;
        }

        /* ── RIGHT COLUMN ── */
        .intro-right {
          flex: 0 0 46%;
          max-width: 46%;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .card-tilt-wrapper {
          position: relative;
          width: 100%;
          max-width: 520px;
        }

        /* slightly tilted dark card */
        .clutch-card {
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          transform: rotate(-3.5deg) translateY(8px);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.28),
            0 8px 24px rgba(0,0,0,0.18);
          transition: transform 0.4s cubic-bezier(.22,1,.36,1);
        }

        .card-tilt-wrapper:hover .clutch-card {
          transform: rotate(-1deg) translateY(0px);
        }

        .clutch-card-img {
          width: 100%;
          display: block;
          aspect-ratio: 16/10;
         object-fit: contain;
        }

        /* Overlay content on top of the card image */
        .clutch-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5,25,40,0.92) 0%,
            rgba(5,25,40,0.55) 50%,
            transparent 100%
          );
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px 28px 24px;
        }

        .clutch-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 28px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          margin: 0 0 4px 0;
          line-height: 1;
        }

        .clutch-card-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          margin: 0 0 16px 0;
          font-weight: 500;
        }

        .btn-card {
          align-self: flex-start;
          padding: 10px 22px;
          font-size: 11px;
          letter-spacing: 0.12em;
          background: rgba(255,255,255,0.12);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.6);
          backdrop-filter: blur(6px);
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
          text-transform: uppercase;
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
        }

        .btn-card:hover {
          background: rgba(255,255,255,0.22);
          border-color: #fff;
        }

        /* ── Neon glow dot on card ── */
        .glow-dot {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px 4px rgba(34,197,94,0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.35); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .intro-inner {
            flex-direction: column;
            padding: 60px 28px;
          }
          .intro-left,
          .intro-right {
            flex: unset;
            max-width: 100%;
            width: 100%;
          }
          .intro-right {
            justify-content: center;
          }
          .clutch-card {
            transform: rotate(-2deg) translateY(4px);
          }
        }

        @media (max-width: 540px) {
          .intro-headline { font-size: 48px; }
          .btn { padding: 12px 22px; font-size: 12px; }
        }
      `}</style>

            <section className="intro-section" ref={sectionRef}>
                <div className="intro-top-blur"/>

                
                {/* Background scraps */}
                <img
                    className="intro-bg-left"
                    src={spotlightBgLeft}
                    alt=""
                    aria-hidden="true"
                />
                <img
                    className="intro-bg-right"
                    src={apeBgRight}
                    alt=""
                    aria-hidden="true"
                />

                <div className="intro-inner">
                    {/* ── LEFT ── */}
                    <div className="intro-left">
                        <div className="intro-badge" data-anim>
                            <span className="badge-apechain">ApeChain</span>
                            <span className="badge-spotlight">Spotlight</span>
                        </div>

                        <h1 className="intro-headline" data-anim>
                            Where dapps
                            <br />
                            shine &amp;
                            <br />
                            you win
                        </h1>

                        <p className="intro-body" data-anim>
                            Spotlight will be broken down into rounds, with each one
                            specifically tailored to the highlighted project(s). This ensures
                            what creators are building is amplified and elevated, while
                            encouraging community participation.
                        </p>

                        <p className="intro-body" data-anim>
                            At each round's end, the top <strong>APE</strong> placements score
                            epic prizes made up of exclusive IRL, holy sh*t experiences and
                            other unforgettable rewards. This system rewards both builders and
                            individual collectors, ensuring engagement at all levels, while
                            offering high-stakes rewards to the most active participants.
                        </p>

                        <p className="intro-tagline" data-anim>
                            Simple, fun, rewarding. Ready to make your mark? 🐒 ✨
                        </p>

                        <div className="intro-ctas" data-anim>
                            <button className="btn btn-outline">Get Started</button>
                            <button className="btn btn-filled">Go Spotlight</button>
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div className="intro-right" data-anim>
                        <div className="card-tilt-wrapper">
                            <div className="clutch-card">
                                {/* Replace src with: import clutchCard from "../assets/clutch-card.png" */}
                                <img
                                    className="clutch-card-img"
                                    src={clutchCard}
                                    alt="Clutch Markets — Decentralized Parlay Platform on ApeChain"
                                />
                                <div className="clutch-card-overlay">
                                    <div className="glow-dot" />
                                    <h2 className="clutch-card-title">Clutch Markets</h2>
                                    <p className="clutch-card-sub">
                                        Decentralized Parlay Platform on ApeChain.
                                    </p>
                                    <button className="btn-card">What's This</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-bottom-blur"/>
            </section>
        </>
    );
}