
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import Opensea from "../../assets/games/opensea.jpg";
import Clutch from "../../assets/games/clutch.jpg";
import th from "../../assets/games/three.jpg";
import four from "../../assets/games/four.jpg";
import five from "../../assets/games/five.jpg";
import apePattern from '../../assets/ape-pattern.png'

const SLIDES = [
  {
    id: 0,
    title: "OTHERSIDE",
    tags: ["GAMES"],
    desc: "Web3-enabled virtual worlds on ApeChain",
    href: "https://apechain.com/apps/otherside",
    image: Opensea,
    accent: "#00c8ff",
  },
  {
    id: 1,
    title: "APECHURCH",
    tags: ["GAMES"],
    desc: "Fully decentralized, non-custodial gaming hub built on ApeChain",
    href: "https://apechain.com/apps/apechurch",
    image: Clutch,
    accent: "#aaee00",
  },
  {
    id: 2,
    title: "OPENSEA",
    tags: ["COLLECTIBLES"],
    desc: "The world's first and largest NFT marketplace",
    href: "https://apechain.com/apps/opensea",
    image: th,
    accent: "#2081e2",
  },
  {
    id: 3,
    title: "CLUTCH MARKET",
    tags: ["GAMES", "FINANCE"],
    desc: "Decentralized parlay platform on ApeChain.",
    href: "https://apechain.com/apps/clutch-market",
    image: four,
    accent: "#00ff88",
  },
  {
    id: 4,
    title: "SLAB CASH",
    tags: ["FINANCE"],
    desc: "Next-gen DeFi liquidity protocol on ApeChain",
    href: "https://apechain.com/apps/slab-cash",
    image: five,
    accent: "#ff6b00",
  },
];

const CARD_W = 3.5;
const CARD_H = 2;
const RADIUS = 5;
const COUNT  = SLIDES.length;
const STEP   = (2 * Math.PI) / COUNT;

/* ─────────────────────────────────────────
   Each card's group is placed at its circle
   position. The mesh itself always faces the
   camera by using DoubleSide — this is the
   key fix. We also store the material ref so
   updateCardVisuals can set opacity directly.
───────────────────────────────────────── */
function updateCardVisuals(s) {
  s.cards.forEach(({ mesh, edges }, i) => {
    // World-space angle of this card slot
    let eff = i * STEP + s.currentAngle;
    // Normalise to [-π, π]
    eff = ((eff % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    if (eff > Math.PI) eff -= 2 * Math.PI;

    // t=1 → front (eff≈0), t=0 → back (eff≈±π)
    const t = 1 - Math.abs(eff) / Math.PI;

    // Front = fully opaque, back = 40% opacity
    const opacity = 0.4 + t * 0.6;
    // Front = 1.22× scale, back = 1.0×
    const scale = 1.0 + t * 0.22;

    mesh.material.opacity = opacity;
    mesh.material.needsUpdate = true;
    edges.material.opacity = 0.15 + t * 0.35;
    edges.material.needsUpdate = true;

    mesh.parent.scale.setScalar(scale);
  });
}

export default function HeroSection() {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    // cards = [{ group, mesh, edges }, ...]
    cards: [],
    wheelGroup: null,
    currentAngle: 0,
    targetAngle: 0,
    activeIdx: 0,
    autoTimer: null,
    animating: false,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  const titleRef = useRef(null);
  const tagRef   = useRef(null);
  const descRef  = useRef(null);
  const btnRef   = useRef(null);

  const animateText = useCallback(() => {
    gsap.fromTo(
      [tagRef.current, titleRef.current, descRef.current, btnRef.current],
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "expo.out", stagger: 0.08 }
    );
  }, []);

  const goTo = useCallback((idx) => {
    const s = stateRef.current;
    if (s.animating) return;
    s.animating = true;

    let diff = idx - s.activeIdx;
    if (diff >  COUNT / 2) diff -= COUNT;
    if (diff < -COUNT / 2) diff += COUNT;

    s.targetAngle -= diff * STEP;
    s.activeIdx = idx;

    gsap.to(s, {
      currentAngle: s.targetAngle,
      duration: 1.1,
      ease: "expo.inOut",
      onUpdate: () => {
        if (s.wheelGroup) s.wheelGroup.rotation.y = s.currentAngle;
        updateCardVisuals(s);
      },
      onComplete: () => {
        s.animating = false;
        setActiveIdx(idx);
        animateText();
      },
    });
  }, [animateText]);

  useEffect(() => {
    const el = mountRef.current;
    const W  = el.clientWidth;
    const H  = el.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const wheelGroup = new THREE.Group();
    scene.add(wheelGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(0, 3, 8);
    scene.add(rim);

    const loader = new THREE.TextureLoader();
    const cards  = [];

    SLIDES.forEach((slide, i) => {
      const angle = i * STEP;
      const group = new THREE.Group();

      group.position.x = Math.sin(angle) * RADIUS;
      group.position.z = Math.cos(angle) * RADIUS;

      // Always face the center of the wheel
      // lookAt origin from current position
      group.lookAt(0, 0, 0);

      const geo = new THREE.PlaneGeometry(CARD_W, CARD_H);

      // ── KEY FIX: THREE.DoubleSide so back-facing cards are visible too
      const mat = new THREE.MeshBasicMaterial({
        color: 0x333333,          // dark placeholder until texture loads
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,   // ← renders both sides
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      const edgesMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      });
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgesMat);
      group.add(edges);

      // Load texture — set on material, preserve current opacity
      loader.load(
        slide.image,
        (tex) => {
          tex.colorSpace  = THREE.SRGBColorSpace;
          tex.magFilter   = THREE.LinearFilter;
          tex.minFilter   = THREE.LinearMipmapLinearFilter;
          mat.map         = tex;
          mat.color.set(0xffffff);  // white so texture shows at full colour
          mat.needsUpdate = true;
          // re-run visuals so opacity is correct after texture swap
          updateCardVisuals(stateRef.current);
        },
        undefined,
        () => { mat.color.set(0x555555); }
      );

      wheelGroup.add(group);
      cards.push({ group, mesh, edges });
    });

    const s      = stateRef.current;
    s.scene      = scene;
    s.camera     = camera;
    s.renderer   = renderer;
    s.cards      = cards;
    s.wheelGroup = wheelGroup;

    updateCardVisuals(s);
    animateText();

    // Auto-advance wheel infinitely every 4 seconds
    s.autoTimer = setInterval(() => {
      goTo((s.activeIdx + 1) % COUNT);
    }, 4000);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const W2 = el.clientWidth;
      const H2 = el.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(s.autoTimer);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [animateText, goTo]);

  const slide = SLIDES[activeIdx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;600;700&family=Barlow:wght@300&display=swap');

        .hs2-bottom-blur {
   hight: 160px;     
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(220, 232, 240, 0)   0%,
    rgba(220, 232, 240, 0.7) 40%,
    rgba(220, 232, 240, 1)   100% 
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  -webkit-mask-image: linear-gradient(to top, black 0%, black 30%, transparent 100%);
  mask-image: linear-gradient(to top, black 0%, black 30%, transparent 100%);
}


        .hs2-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #080808;
          font-family: 'Barlow Condensed', sans-serif;
          color: #fff;
          padding-bottom: 80px;
          // background: linear-gradient(
          //    to right,
          //    #00c853,
          //    #ffee58,
          //    #ffffff,
          //    #000000
          // );
        }
        .hs2-canvas-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hs2-canvas-wrap canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
        .hs2-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.52) 36%,
            rgba(0,0,0,0.0) 60%
          );
          pointer-events: none;
        }
        .hs2-rings {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: none;
          opacity: 0.07;
          padding-right: 4%;
        }
        .hs2-content {
          position: absolute;
          left: clamp(28px, 5.5vw, 90px);
          bottom: clamp(90px, 15vh, 170px);
          z-index: 10;
          max-width: 480px;
        }
        .hs2-hot-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .hs2-hot {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.1em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .hs2-tag {
          padding: 3px 9px;
          border: 1px solid rgba(255,255,255,0.4);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
        }
        .hs2-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(54px, 8.5vw, 112px);
          line-height: 0.88;
          letter-spacing: 0.02em;
          color: #fff;
          margin: 4px 0 12px;
        }
        .hs2-desc {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: clamp(10px, 1.1vw, 13px);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 26px;
        }
        .hs2-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 38px;
          background: #fff;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .hs2-btn:hover { background: #e0e0e0; transform: scale(1.04); }
        .hs2-arrows {
          position: absolute;
          right: clamp(18px, 3vw, 52px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hs2-arrow {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: transparent;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          backdrop-filter: blur(6px);
        }
        .hs2-arrow:hover {
          background: rgba(255,255,255,0.12);
          border-color: #fff;
          transform: scale(1.08);
        }
        .hs2-strip {
          position: absolute;
          bottom: clamp(20px, 3.5vh, 42px);
          right: clamp(18px, 3vw, 52px);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .hs2-thumb {
          width: 58px;
          height: 38px;
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          border: 1.5px solid transparent;
          opacity: 0.45;
          flex-shrink: 0;
          transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
        }
        .hs2-thumb:hover { opacity: 0.8; transform: scale(1.06); }
        .hs2-thumb.active { border-color: #fff; opacity: 1; }
        .hs2-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hs2-see-all {
          position: absolute;
          right: clamp(18px, 3vw, 52px);
          bottom: calc(clamp(20px, 3.5vh, 42px) + 52px);
          z-index: 10;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .hs2-see-all:hover { color: #fff; }
        @media (max-width: 640px) {
          .hs2-arrows { display: none; }
          .hs2-strip { right: 10px; }
          .hs2-see-all { right: 10px; }
        }
      `}</style>

      <section className="hs2-root" 
      style={{
             backgroundImage: `url(${apePattern})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             // backgroundAttachment: 'fixed',
           
            
          }}
      >
        <div className="hs2-rings">
          <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
            {[70, 130, 200, 270, 340, 400].map((r, i) => (
              <circle key={i} cx="350" cy="350" r={r}
                stroke={slide.accent}
                strokeWidth={i % 2 === 0 ? "1.5" : "0.6"}
                strokeDasharray={i % 3 === 0 ? "6 14" : "none"}
              />
            ))}
          </svg>
        </div>

        <div className="hs2-canvas-wrap" ref={mountRef} />
        <div className="hs2-overlay" />

        <div className="hs2-content">
          <div className="hs2-hot-row" ref={tagRef}>
            <span className="hs2-hot">🔥 HOT</span>
            {slide.tags.map((t) => (
              <span key={t} className="hs2-tag">{t}</span>
            ))}
          </div>
          <h1 className="hs2-title" ref={titleRef}>{slide.title}</h1>
          <p className="hs2-desc" ref={descRef}>{slide.desc}</p>
          <a className="hs2-btn" href={slide.href} target="_blank" rel="noopener noreferrer" ref={btnRef}>
            LAUNCH
          </a>
        </div>

        <div className="hs2-arrows">
          <button className="hs2-arrow" onClick={() => goTo((stateRef.current.activeIdx + 1) % COUNT)} aria-label="Next">▶</button>
          <button className="hs2-arrow" onClick={() => goTo((stateRef.current.activeIdx - 1 + COUNT) % COUNT)} aria-label="Prev">◀</button>
        </div>

        <a className="hs2-see-all" href="https://apechain.com/apps" target="_blank" rel="noopener noreferrer">
          SEE ALL APPS ▶
        </a>

        <div className="hs2-strip ">
          {SLIDES.map((s, i) => (
            <div key={s.id} className={`hs2-thumb${i === activeIdx ? " active" : ""}`} onClick={() => goTo(i)}>
              <img src={s.image} alt={s.title} loading="lazy" />
            </div>
          ))}
        </div>
        
        {/* <div className="hs2-bottom-blur color-white" >AAAAAAAAAAAA</div> */}
      </section>
    </>
  );
}