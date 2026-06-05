import { forwardRef, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import card1 from "../../assets/risecards/card1.png";
import card2 from "../../assets/risecards/card2.png";
import card3 from "../../assets/risecards/card3.png";
import card4 from "../../assets/risecards/card4.png";
import card5 from "../../assets/risecards/card5.png";
import card6 from "../../assets/risecards/card6.png";

const cards = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
];

const RiseCards = forwardRef(function RiseCards(_, forwardedRef) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const setSectionRef = useCallback(
    (node) => {
      sectionRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading Animation
      gsap.from(".rise-cards-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Cards Animation
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    // Center first card
    const centerFirstCard = () => {
      if (!sliderRef.current || !cardsRef.current[0])
        return;

      const slider = sliderRef.current;
      const firstCard = cardsRef.current[0];

      slider.scrollLeft =
        firstCard.offsetLeft -
        slider.offsetWidth / 2 +
        firstCard.offsetWidth / 2;
    };

    setTimeout(centerFirstCard, 100);

    window.addEventListener(
      "resize",
      centerFirstCard
    );

    return () => {
      ctx.revert();

      window.removeEventListener(
        "resize",
        centerFirstCard
      );
    };
  }, []);

  // Start dragging
  const startDragging = (e) => {
    isDragging.current = true;

    startX.current =
      e.pageX - sliderRef.current.offsetLeft;

    scrollLeft.current =
      sliderRef.current.scrollLeft;
  };

  // Stop dragging
  const stopDragging = () => {
    isDragging.current = false;
  };

  // While dragging
  const onDragging = (e) => {
    if (!isDragging.current) return;

    e.preventDefault();

    const x =
      e.pageX - sliderRef.current.offsetLeft;

    const walk = (x - startX.current) * 1.4;

    sliderRef.current.scrollLeft =
      scrollLeft.current - walk;
  };

  return (
    <section
      ref={setSectionRef}
      id="rise-cards"
      className="relative -mt-20 min-h-screen scroll-mt-20 overflow-hidden bg-[#dce4ef] pt-52 pb-20 text-black sm:-mt-24 sm:pt-56 md:-mt-32 md:pt-64 md:pb-24"
    >
      <div
        className="absolute -top-40 left-1/2 h-[430px] w-[140vw] -translate-x-1/2 pointer-events-none opacity-95 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(220,228,239,0.98) 0%, rgba(220,228,239,0.82) 44%, rgba(220,228,239,0.2) 62%, rgba(220,228,239,0) 78%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#dce4ef]/60 via-[#dce4ef]/90 to-[#dce4ef]" />

      <div className="relative z-10 max-w-[1800px] mx-auto text-center px-4">
        
        {/* Heading */}
        <h2 className="rise-cards-heading mb-14 text-4xl font-bold text-black sm:mb-20 sm:text-6xl md:text-7xl">
          RISE TO THE TOP <br />
          <span className="text-[#0052ff]">
            WITH...
          </span>
        </h2>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseDown={startDragging}
          onMouseMove={onDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className="scrollbar-hide flex cursor-grab select-none gap-5 overflow-x-auto px-[34vw] pb-10 active:cursor-grabbing sm:gap-6 sm:px-[35vw] md:px-[28vw] lg:px-[24vw]"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) =>
                (cardsRef.current[index] = el)
              }
              className="group h-[382px] w-[260px] flex-none cursor-pointer overflow-hidden rounded-[28px] transition-all duration-500 sm:h-[441px] sm:w-[300px] sm:rounded-[32px] md:w-[340px]"
            >
              <img
                src={card}
                alt={`card-${index + 1}`}
                className={`
                  w-full h-full rounded-[32px]
                  shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                  pointer-events-none select-none
                  transition-transform duration-500
                  group-hover:scale-[1.03]

                  ${
                    index === 0
                      ? "object-cover object-[center_35%] scale-[1.08]"
                      : index === 1
                      ? "object-cover object-[center_38%] scale-[1.08]"
                      : index === 2
                      ? "object-cover object-[center_36%] scale-[1.08]"
                      : "object-cover object-center"
                  }
                `}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RiseCards;