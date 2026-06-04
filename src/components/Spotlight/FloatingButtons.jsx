import { motion } from "framer-motion";
import React from "react";

export default function FloatingButtons() {
  const buttons = [
    { pos: "left-[8%] top-[38%]", text: "COMPLETE QUESTS" },
    { pos: "right-[8%] top-[38%]", text: "WIN AWESOME PRIZES" },
    { pos: "left-[8%] bottom-[22%]", text: "CLIMB THE LEADERBOARDS" },
    { pos: "right-[8%] bottom-[22%]", text: "BUILD CONNECTIONS" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      {buttons.map((btn, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className={`absolute ${btn.pos} flex items-center justify-center`}
        >
          <motion.button
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-center justify-center px-12 py-5 min-w-[170px] h-[36px] bg-gradient-to-b from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 border border-pink-500 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition duration-300"
          >
            <span className="text-white font-medium tracking-[0.22em] text-[10px] uppercase leading-none text-center">{btn.text}</span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
