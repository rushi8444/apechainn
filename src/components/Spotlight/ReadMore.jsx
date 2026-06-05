import { motion } from "framer-motion";

const cards = [
  {
    title: "Spotlight Overview",
    description:
      "Head here for a comprehensive breakdown of the spotlight program.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600",
    button: "OVERVIEW",
  },
  {
    title: "Got Questions?",
    description:
      "Head over to the FAQ found at the bottom of the Spotlight introduction blog.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600",
    button: "VIEW FAQS",
  },
];

const apeFloat = {
  rest: {
    y: 0,
    rotate: 0,
    scale: 1,
  },
  hover: {
    y: [0, -14, 9, -7, 0],
    rotate: [0, -1.5, 1.8, -0.8, 0],
    scale: 1.035,
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const apeOutlinePaths = [
  "M158 250C126 182 162 106 246 82C289 26 432 26 474 82C558 106 594 182 562 250C606 302 574 392 496 410C462 466 258 466 224 410C146 392 114 302 158 250Z",
  "M222 232C238 188 282 164 330 184",
  "M390 184C438 164 482 188 498 232",
  "M274 274C296 258 328 258 350 276",
  "M370 276C392 258 424 258 446 274",
  "M298 348C332 374 388 374 422 348",
  "M330 306C344 322 376 322 390 306",
  "M238 122C212 154 202 192 210 232",
  "M482 122C508 154 518 192 510 232",
  "M252 396C298 418 422 418 468 396",
];

function ApeOutline() {
  return (
    <div
      className="
        absolute
        left-1/2
        top-1/2
        z-[1]
        hidden
        w-[min(120vw,1500px)]
        -translate-x-1/2
        -translate-y-1/2
        cursor-crosshair
        opacity-35
        mix-blend-multiply
        md:block
      "
      aria-hidden="true"
    >
      <motion.div
        variants={apeFloat}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="w-full"
        style={{
          transformOrigin: "50% 55%",
        }}
      >
        <svg
          viewBox="0 0 720 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full drop-shadow-[0_22px_60px_rgba(0,82,255,0.2)]"
        >
          <defs>
            <filter id="readmore-ape-water">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.028"
                numOctaves="2"
                seed="8"
                result="waves"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="5s"
                  values="0.012 0.028;0.018 0.04;0.012 0.028"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="waves"
                scale="9"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <g
            filter="url(#readmore-ape-water)"
            stroke="#0052ff"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {apeOutlinePaths.map((path, index) => (
              <motion.path
                key={path}
                d={path}
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 1.25,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

function ReadMore() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#dce4ef] pt-44 pb-40 md:pt-60 md:pb-56 xl:pt-72 xl:pb-72">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #8ca0b3 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[35%] -translate-x-1/2 w-[760px] h-[760px] bg-blue-400/10 blur-[170px] rounded-full" />

      <ApeOutline />

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            text-center
            uppercase
            font-black
            text-[#0052ff]
            text-[40px]
            sm:text-[58px]
            md:text-[88px]
            leading-none
            mb-12
            md:mb-20
          "
        >
          Read More
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="
                relative
                rounded-[40px]
                overflow-hidden
                h-[340px]
                sm:h-[400px]
                md:h-[440px]
                group
                border-[2px]
                border-[#f19172]
                shadow-[0_0_30px_rgba(241,145,114,0.18)]
              "
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#04122c]/65 backdrop-blur-[2px]" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center sm:px-8 md:px-10">
                <h3
                  className="
                    text-white
                    uppercase
                    font-black
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    leading-none
                  "
                >
                  {card.title}
                </h3>

                <p className="mt-5 max-w-[460px] text-xs uppercase leading-6 tracking-wide text-white sm:mt-6 md:text-sm md:leading-7">
                  {card.description}
                </p>

                <div className="mt-7 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#60a5fa,#a855f7,#ec4899,#60a5fa)] p-[8px] shadow-xl shadow-blue-500/40 transition-all duration-500 hover:shadow-pink-500/60 sm:mt-8">
                  <button
                    className="
                      flex
                      items-center
                      justify-center
                      px-12
                      py-5
                      min-w-[170px]
                      h-[36px]
                      rounded-full
                      bg-[#0052ff]
                      ring-1
                      ring-white/20
                    "
                  >
                    <span className="text-white font-medium tracking-[0.22em] text-[10px] uppercase leading-none text-center whitespace-nowrap">
                      {card.button}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReadMore;