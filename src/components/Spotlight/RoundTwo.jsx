import { motion } from "framer-motion";

function RoundTwo() {
  return (
    <section
      id="round-two"
      className="relative overflow-hidden bg-[#dce4ef] py-16 md:py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-300/20 blur-[140px] rounded-full" />

      {/* Center Container */}
      <div className="w-full flex justify-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            w-full
            max-w-[1300px]
            h-[560px]
            overflow-hidden
            rounded-[50px]
            shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800')",
            }}
          />

          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />

          {/* Exact Center Content */}
          <div className="absolute inset-0 grid place-items-center z-10">
            <div className="flex max-w-[850px] flex-col items-center px-6 text-center">
              
              <h1 className="text-[48px] md:text-[72px] font-black uppercase leading-[0.95] tracking-[-2px] text-white">
                ROUND #2:
                <br />
                PREDICT,
                PLAY,
                WIN
              </h1>

              <p className="mt-8 text-white/90 uppercase text-sm md:text-base leading-8 tracking-wide max-w-[700px] mx-auto">
                “SPOTLIGHT: SIMPLY BUILT DIFFERENT” IS AN OPPORTUNITY
                TO PROVE YOUR KNOWLEDGE FOR A SHOT AT WINNING EXCLUSIVE
                REWARDS AND INFLUENCING THE INTERN TO SWEEP APECHAIN NFTS.
              </p>

              <div className="mt-10 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#60a5fa,#a855f7,#ec4899,#60a5fa)] p-[8px] shadow-xl shadow-blue-500/40 transition-all duration-500 hover:shadow-pink-500/60">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                    INTERMISSION
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RoundTwo;