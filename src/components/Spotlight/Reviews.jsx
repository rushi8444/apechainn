import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex Carter",
    role: "NFT Collector",
    review:
      "Spotlight completely changed how I discover projects. The ecosystem feels premium and rewards are actually exciting.",
  },
  {
    name: "Sarah Kim",
    role: "Web3 Explorer",
    review:
      "Round 2 feels incredibly polished. From quests to rewards, everything feels fun and competitive.",
  },
  {
    name: "John Walker",
    role: "Community Member",
    review:
      "Probably one of the best experiences in Web3. Smooth UI, engaging leaderboards and real incentives.",
  },
];

function Reviews() {
  return (
    <section className="relative bg-[#dce4ef] py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-[20%] w-[350px] h-[350px] bg-purple-400/20 blur-[120px] rounded-full" />

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[5px] text-purple-600 font-semibold text-sm">
            Community
          </p>

          <h2 className="text-[60px] md:text-[90px] font-black uppercase text-[#0047FF] leading-none mt-5">
            Reviews
          </h2>
        </motion.div>

        {/* Review Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                rounded-[40px]
                bg-white/70
                backdrop-blur-xl
                border
                border-white/50
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                p-10
                overflow-hidden
                group
              "
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-300/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Stars */}
              <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-[#0047FF] text-[#0047FF]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 text-lg leading-9 font-medium">
                "{item.review}"
              </p>

              {/* User */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h4 className="text-2xl font-bold text-black">
                  {item.name}
                </h4>

                <p className="text-gray-500 mt-1">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;