import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SpotHero from "../components/Spotlight/SpotHero";
import RiseCards from "../components/Spotlight/RiseCards";
import RoundTwo from "../components/Spotlight/RoundTwo";
import ReadMore from "../components/Spotlight/ReadMore";
import Reviews from "../components/Spotlight/Reviews";
import SeasonCard from "../components/Spotlight/SeasonCard";

function Spotlight() {
  return (
    <main className="bg-[#050816] text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Static Card */}
      <SeasonCard />

      <SpotHero />
      <RiseCards />
      <RoundTwo />
      <ReadMore />
      <Reviews />

      <Footer />
    </main>
  );
}

export default Spotlight;