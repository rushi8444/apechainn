import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
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
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const cardLayout = useMemo(() => {
    const lanes = [28, 182, 338];
    return reviews.map((_, index) => {
      const lane = lanes[index % lanes.length];
      const jitter = Math.floor(Math.random() * 24) - 12;
      return {
        top: lane + jitter,
        paddingTop: 28 + Math.floor(Math.random() * 18),
        paddingRight: 28 + Math.floor(Math.random() * 28),
        paddingBottom: 30 + Math.floor(Math.random() * 22),
        paddingLeft: 24 + Math.floor(Math.random() * 20),
      };
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reviews-bg-title", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      });

      const sectionWidth =
        sectionRef.current?.offsetWidth || window.innerWidth;
      const FLOW_DURATION = 16;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardWidth = card.offsetWidth || 360;
        const startX = sectionWidth + 120 + index * 140;
        const endX = -cardWidth - 160;

        gsap.set(card, {
          x: startX,
          y: cardLayout[index].top,
          opacity: 1,
        });

        gsap.to(card, {
          x: endX,
          duration: FLOW_DURATION,
          ease: "none",
          repeat: -1,
          delay: -(index * (FLOW_DURATION / reviews.length)),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cardLayout]);

  return (
    <section ref={sectionRef} className="relative bg-[#dce4ef] py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-[20%] w-[350px] h-[350px] bg-purple-400/20 blur-[120px] rounded-full" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
  <h2 className="reviews-bg-title text-[90px] md:text-[180px] lg:text-[240px] font-black uppercase tracking-[0.08em] text-[#0047FF]/10 leading-none select-none">
    Reviews
  </h2>
</div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* Review Cards Flow Right -> Left */}
        <div
          ref={trackRef}
          className="relative h-[560px] md:h-[620px] w-full overflow-hidden"
        >
          {reviews.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="
                review-card
                absolute
                left-0
                w-[88vw]
                max-w-[420px]
                rounded-[40px]
                bg-white/70
                backdrop-blur-xl
                border
                border-white/50
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                p-10
                overflow-hidden
                group
                flex
                flex-col
                transition-transform
                duration-300
                hover:-translate-y-2
                hover:scale-[1.02]
              "
              style={{
                paddingTop: `${cardLayout[index].paddingTop}px`,
                paddingRight: `${cardLayout[index].paddingRight}px`,
                paddingBottom: `${cardLayout[index].paddingBottom}px`,
                paddingLeft: `${cardLayout[index].paddingLeft}px`,
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-300/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Stars */}
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-[#0047FF] text-[#0047FF]"
                  />
                ))}
              </div>

              {/* Review */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-700 text-base md:text-lg leading-7 md:leading-8 tracking-[0.01em] font-medium text-center px-2 md:px-3">
                  "{item.review}"
                </p>
              </div>

              {/* User */}
              <div className="mt-8 border-t border-gray-200 pt-5">
                <h4 className="text-xl md:text-2xl font-bold text-black leading-tight">
                  {item.name}
                </h4>

                <p className="text-gray-500 mt-2 text-sm md:text-base tracking-wide">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;