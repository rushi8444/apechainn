import { useRef } from "react";
import { motion } from "framer-motion";
import FloatingButtons from "./FloatingButton";
import LeaderboardImages from "./LeaderboardImages";

function SpotHero() {
  const riseCardsRef = useRef(null);

  const scrollToRiseCards = () => {
    riseCardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center px-6 text-center pb-32 transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom, 
            rgba(5, 11, 24, 0.3) 0%, 
            rgba(10, 35, 90, 0.45) 55%, 
            #050b18 88%,
            rgba(5, 11, 24, 0.9) 100%
          ), 
          url('/ape-bg.png')
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center w-full"
      >
        <h1 className="flex flex-col justify-center uppercase leading-none text-center">
          <span className="block text-5xl md:text-7xl font-medium text-gray-300">Welcome to</span>
          <span className="block text-6xl md:text-[128px] font-extrabold text-blue-300/90 tracking-[-0.04em] mt-2">SPOTLIGHT</span>
        </h1>

        <FloatingButtons />
        <LeaderboardImages />

        <div className="relative mt-12 flex flex-col items-center justify-center z-30">
          <p className="max-w-[620px] mx-auto font-mono text-xs md:text-sm text-center uppercase leading-relaxed tracking-wider text-gray-300">
            Step Into <a href="/spotlight" className="underline text-gray-400 hover:text-blue-300 font-semibold transition">Spotlight</a> — A points program designed to highlight builders while activating and engaging the ApeChain Community.
          </p>
          <motion.button
            onClick={scrollToRiseCards}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-10 px-14 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 border border-blue-400 rounded-full shadow-xl shadow-blue-500/40 hover:shadow-pink-500/60 transition-all duration-500 font-mono font-bold tracking-widest text-lg uppercase"
          >
            INTERMISSION
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default SpotHero;