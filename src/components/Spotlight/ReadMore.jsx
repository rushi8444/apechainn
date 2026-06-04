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

function ReadMore() {
  return (
    <section className="relative bg-[#dce4ef] py-28 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #8ca0b3 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/10 blur-[140px] rounded-full" />

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
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
            text-[70px]
            md:text-[110px]
            leading-none
            mb-20
          "
        >
          Read More
        </motion.h2>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
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
                h-[520px]
                group
                border-[4px]
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
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-10">
                <h3
                  className="
                    text-white
                    uppercase
                    font-black
                    text-5xl
                    md:text-6xl
                    leading-none
                  "
                >
                  {card.title}
                </h3>

                <p className="text-white uppercase text-sm md:text-base leading-8 tracking-wide mt-8 max-w-[500px]">
                  {card.description}
                </p>

                <button
                  className="
                    mt-10
                    px-10
                    py-4
                    rounded-full
                    bg-[#0052ff]
                    border
                    border-[#6eb8ff]
                    text-white
                    uppercase
                    tracking-[2px]
                    font-semibold
                    shadow-[0_0_30px_rgba(0,82,255,0.45)]
                  "
                >
                  {card.button}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReadMore;