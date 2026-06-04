import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  Coins,
  Gem,
  Palette,
  Gift,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    title: "Community Leaderboard",
    desc: "Track top-performing communities.",
    icon: Users,
  },
  {
    title: "Individual Leaderboard",
    desc: "Compete and climb rankings.",
    icon: Trophy,
  },
  {
    title: "Point Quest",
    desc: "Complete quests and earn points.",
    icon: Coins,
  },
  {
    title: "NFT Multiplier",
    desc: "Boost rewards through NFTs.",
    icon: Gem,
  },
  {
    title: "Round Themes",
    desc: "Explore every round's challenges.",
    icon: Palette,
  },
  {
    title: "Exclusive Rewards",
    desc: "Unlock premium rewards.",
    icon: Gift,
  },
];

function RiseCards() {
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const startDragging = (e) => {
    isDragging.current = true;

    sliderRef.current.classList.add(
      "cursor-grabbing"
    );

    startX.current =
      e.pageX -
      sliderRef.current.offsetLeft;

    scrollLeft.current =
      sliderRef.current.scrollLeft;
  };

  const stopDragging = () => {
    isDragging.current = false;

    sliderRef.current.classList.remove(
      "cursor-grabbing"
    );
  };

  const onDragging = (e) => {
    if (!isDragging.current) return;

    e.preventDefault();

    const x =
      e.pageX -
      sliderRef.current.offsetLeft;

    const walk =
      (x - startX.current) * 2.2;

    sliderRef.current.scrollLeft =
      scrollLeft.current - walk;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-purple-300/20 blur-[140px]" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-black mt-4">
            <p>RISE TO THE TOP</p>

            <p className="text-[#0052ff]">
              WITH...
            </p>
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            onMouseDown={startDragging}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={onDragging}
            className="
              flex
              flex-nowrap
              overflow-x-auto
              scrollbar-hide
              cursor-grab
              gap-6
              px-[calc(50vw-135px)]
              pb-8
              select-none
              scroll-smooth
            "
          >
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    rotate: -1,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    flex-none
                    w-[270px]
                    h-[300px]
                    rounded-[34px]
                    border
                    border-purple-100
                    bg-gradient-to-br
                    from-white
                    to-purple-50
                    shadow-lg
                    hover:shadow-[0_25px_60px_rgba(168,85,247,0.18)]
                    transition-all
                    duration-500
                    p-6
                    flex
                    flex-col
                    justify-between
                    cursor-pointer
                    group
                    relative
                  "
                >
                  {/* Glow */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 -top-10 -right-10 w-28 h-28 bg-purple-300/20 rounded-full blur-3xl" />

                  {/* Top */}
                  <div>
                    <motion.div
                      whileHover={{
                        rotate: 10,
                        scale: 1.08,
                      }}
                      className="
                        w-16 h-16
                        rounded-[20px]
                        bg-gradient-to-br
                        from-purple-500
                        via-fuchsia-500
                        to-indigo-500
                        flex items-center justify-center
                        shadow-lg
                      "
                    >
                      <Icon
                        size={28}
                        className="text-white"
                      />
                    </motion.div>

                    <h3 className="text-[22px] font-bold text-black mt-6 leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-6 mt-3">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-auto">
                    

                    <motion.div
                      whileHover={{
                        rotate: 45,
                      }}
                      className="
                        w-11 h-11
                        rounded-full
                        bg-purple-100
                        flex items-center justify-center
                      "
                    >
                      <ArrowUpRight
                        size={18}
                        className="text-purple-700"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default RiseCards;