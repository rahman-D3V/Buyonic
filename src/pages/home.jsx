import bg0 from "../assets/bg0.gif";
import Footer from "../components/Footer";
import { BestDeals, GiftingSections, HeroSection, Spectacles, WinterSection } from "../components/homePageComponents";

const Home = () => {
  return (
    <div className="bg-[#f1f3f6] p-1 h-screen mt-21">
      <HeroSection />

      <BestDeals />

      <Spectacles />

      <GiftingSections />

      <WinterSection />

      <Footer />
    </div>
  );
};

export default Home;
