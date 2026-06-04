import { motion } from "framer-motion";

function RoundTwo() {
  return (
    <section
      id="round-two"
      className="relative bg-white py-24 overflow-hidden"
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
            h-[700px]
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
            <div className="text-center px-6 max-w-[850px]">
              
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  mt-10
                  px-10
                  py-4
                  rounded-full
                  bg-[#0052ff]
                  border
                  border-[#7fb1ff]
                  text-white
                  uppercase
                  tracking-[2px]
                  font-semibold
                  shadow-[0_0_35px_rgba(0,82,255,0.45)]
                "
              >
                INTERMISSION
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RoundTwo;