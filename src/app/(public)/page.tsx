import { AboutUs } from "./_components/about-us";
import { AvailableProperties } from "./_components/available-properties";
import { ContactSection } from "./_components/contact-section";
import { FeaturedProperties } from "./_components/featured-properties";
import { HeroSection } from "./_components/hero";
import { NewsArticles } from "./_components/news-articles";
import { OurAwards } from "./_components/our-awards";
import { OurClients } from "./_components/our-clients";
import { OurTeam } from "./_components/our-team";


// ----------------------------------------------------------------------
export const metadata = {
  title: 'Dreamestate: Real Estate Trading Website',
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default function Page() {
  return (
    <>
      <HeroSection />
      {/* <FeaturedListings /> */}
      <FeaturedProperties />
      <AboutUs />
      {/* <OngoingProjects /> */}
      <AvailableProperties />
      <OurClients />
      <OurTeam />
      {/* <Testimonials /> */}
      <OurAwards />
      {/* <ScheduleVisit /> */}
      <ContactSection />
      <NewsArticles />
      {/* <InstagramSection /> */}
    </>
  );
}
