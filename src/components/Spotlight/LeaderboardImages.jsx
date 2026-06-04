import { motion } from "framer-motion";

function LeaderboardImages() {
  return (
    <div className="relative mt-16 flex items-center justify-center">
      <motion.img
        src="/community-leaderboard.png"
        alt="Community Leaderboard"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.08, rotate: -10 }}
        transition={{ duration: 0.6 }}
        className="w-[92px] md:w-[184px] rotate-[-8deg] rounded-[30px] border border-pink-400 shadow-[0_0_80px_rgba(59,130,246,0.35)] z-20 transition-transform duration-500 ease-in-out"
      />
      <motion.img
        src="/individual.png"
        alt="Individual Leaderboard"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.08, rotate: 12 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-[92px] md:w-[184px] rotate-[8deg] rounded-[30px] border border-pink-400 shadow-[0_0_80px_rgba(59,130,246,0.35)] -ml-12 mt-28 z-10 transition-transform duration-500 ease-in-out"
      />
    </div>
  );
}

export default LeaderboardImages;