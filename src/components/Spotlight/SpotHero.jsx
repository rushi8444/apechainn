import { motion } from "framer-motion";
import FloatingButtons from "./FloatingButton";
import LeaderboardImages from "./LeaderboardImages";

function SpotHero({ onIntermissionClick }) {
  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cover bg-center px-4 py-24 pb-44 text-center transition-all duration-700 ease-in-out sm:px-6 md:py-28 md:pb-48"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom, 
            rgba(5, 11, 24, 0.3) 0%, 
            rgba(10, 35, 90, 0.45) 55%, 
            #050b18 88%,
            #050b18 100%
          ), 
          url('/ape-bg.png')
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[24vh] bg-gradient-to-t from-[#dce4ef] from-0% via-[#dce4ef]/55 via-52% to-transparent" />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 z-[1] h-52 w-[125vw] -translate-x-1/2 rounded-[50%] opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(220,228,239,1) 0%, rgba(220,228,239,0.45) 50%, rgba(220,228,239,0) 78%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-2 text-center sm:px-4"
      >
        <h1 className="flex flex-col justify-center uppercase leading-none text-center">
          <span className="block text-4xl font-medium text-gray-300 sm:text-5xl md:text-7xl">Welcome to</span>
          <span className="mt-2 block text-[clamp(3.5rem,16vw,8rem)] font-extrabold tracking-[-0.04em] text-blue-300/90">SPOTLIGHT</span>
        </h1>

        <FloatingButtons />
        <LeaderboardImages />

        <div className="relative z-30 mt-12 flex flex-col items-center justify-center">
          <p className="mx-auto max-w-[620px] font-mono text-xs uppercase leading-relaxed tracking-wider text-black md:text-sm">
            Step Into <a href="/spotlight" className="underline text-black hover:text-blue-300 font-semibold transition">Spotlight</a> — A points program designed to highlight builders while activating and engaging the ApeChain Community.
          </p>
          <motion.button
            onClick={onIntermissionClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex h-[36px] min-w-[170px] items-center justify-center rounded-full border border-blue-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-12 py-5 shadow-xl shadow-blue-500/40 transition-all duration-500 hover:shadow-pink-500/60"
          >
            <span className="text-white font-medium tracking-[0.22em] text-[10px] uppercase leading-none text-center whitespace-nowrap">
              INTERMISSION
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default SpotHero;