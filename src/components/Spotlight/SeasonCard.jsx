import { motion } from "framer-motion";

function SeasonCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        fixed
        bottom-6
        right-6
        z-[999]
        bg-[#dfe7f2]
        rounded-[22px]
        border-[3px]
        border-black
        overflow-hidden
        shadow-[0_15px_40px_rgba(0,0,0,0.18)]
        w-[260px]
      "
    >
      {/* Top Bar */}
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
        <span className="font-bold uppercase text-[10px] tracking-wide">
          Season #2
        </span>

        <span className="font-bold uppercase text-[10px] tracking-wide">
          Leaderboard
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center">
        <h3 className="text-[24px] font-black uppercase text-black leading-[1]">
          Predict.
          <br />
          Play.
          <br />
          Win.
        </h3>

        <p className="uppercase text-gray-600 text-[11px] mt-3 tracking-wide">
          Intermission
        </p>
      </div>
    </motion.div>
  );
}

export default SeasonCard;