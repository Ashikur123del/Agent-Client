import FeaturedTourPackages from "@/components/FeaturedTourPackages";
import HeroBanner from "@/components/HeroBanner";
import NewsletterSection from "@/components/NewsletterSection";
import TravelInsights from "@/components/TravelInsights";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WhyChooseUs />
      <FeaturedTourPackages />
      <TravelInsights />
      <NewsletterSection />
    </div>
  );
}
