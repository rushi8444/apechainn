import { useRef } from "react";
import Navbar from "../components/common/Navbar";
import SpotHero from "../components/Spotlight/SpotHero";
import RiseCards from "../components/Spotlight/RiseCards";
import RoundTwo from "../components/Spotlight/RoundTwo";
import ReadMore from "../components/Spotlight/ReadMore";
import Reviews from "../components/Spotlight/Reviews";
import SeasonCard from "../components/Spotlight/SeasonCard";

function Spotlight() {
  const riseCardsRef = useRef(null);

  const scrollToRiseCards = () => {
    riseCardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-[#050816] text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Static Card */}
      <SeasonCard />

      <SpotHero onIntermissionClick={scrollToRiseCards} />
      <RiseCards ref={riseCardsRef} />
      <RoundTwo />
      <ReadMore />
      <Reviews />
    </main>
  );
}

export default Spotlight;