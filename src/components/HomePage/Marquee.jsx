import { useEffect } from "react";
import Clutch from "../../assets/games/clutch.jpg";
import four from "../../assets/games/four.jpg";
import Three from "../../assets/games/three.jpg";
import OpenSea from "../../assets/games/opensea.jpg";


const css = `
  @keyframes ape-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ape-item {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding-right: 48px;
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: -1.5px;
    text-transform: uppercase;
    color: #0f172a;
    white-space: nowrap;
    font-family: 'Arial Black', Impact, sans-serif;
    cursor: pointer;
    transition: color 0.25s;
  }
  .ape-item:hover {
    color: #2563eb;
  }
  .ape-item:hover .ape-icon {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
  .ape-icon {
    width: 65px;
    height: 65px;
    border-radius: 14px;
    flex-shrink: 0;
    border: 1.5px solid #cbd5e1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .ape-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ape-track {
    display: flex;
    align-items: center;
    width: fit-content;
    animation: ape-scroll 35s linear infinite;
    will-change: transform;
  }
  .ape-track.reverse {
    animation-direction: reverse;
  }
`;

const ROW1 = [
  {
    label: "Intellectual Property",
    img: Clutch,
    fallback: "#1a3a6e",
  },
  {
    label: "Collectibles",
    img: four,
    fallback: "#1e4a8a",
  },
  {
    label: "Finance",
    img: Three,
    fallback: "#111827",
  },
  {
    label: "Infrastructure",
    img: OpenSea,
    fallback: "#4c1d95",
  },
  {
    label: "Games",
    img: Clutch,
    fallback: "#0f172a",
  },
];

const ROW2 = [ROW1[3], ROW1[4], ROW1[2], ROW1[1], ROW1[0]];

function Track({ items, direction }) {
  const doubled = [...items, ...items];
  const isReverse = direction === "right";

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div className={`ape-track${isReverse ? " reverse" : ""}`}>
        {doubled.map((item, i) => (
          <span key={`${item.label}-${i}`} className="ape-item">
            <span className="ape-icon">
              <img
                src={item.img}
                alt={item.label}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.style.background = item.fallback;
                }}
              />
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  return (
    <div
      style={{
        background: "#dce8f0",
        userSelect: "none",
        width: "100%",
        paddingBottom: "9rem",
      }}
    >
      <div style={{ padding: "1.5rem 0 0.75rem" }}>
        <Track items={ROW1} direction="left" />
      </div>
      <div style={{ padding: "0.75rem 0 1.5rem" }}>
        <Track items={ROW2} direction="right" />
      </div>
    </div>
  );
}