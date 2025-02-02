import { AboutUs } from "./_components/about-us";
import { FeaturedListings } from "./_components/featured-listings";
import { HeroSection } from "./_components/hero";
import { InstagramSection } from "./_components/instagram";
import { NewsArticles } from "./_components/news-articles";
import { OngoingProjects } from "./_components/ongoing-projects";
import { OurAwards } from "./_components/our-awards";
import { OurClients } from "./_components/our-clients";
import { OurTeam } from "./_components/our-team";
import { ScheduleVisit } from "./_components/schedul-visit";
import { Testimonials } from "./_components/testimonials";


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
      <FeaturedListings />
      <AboutUs />
      <OngoingProjects />
      <OurClients />
      <OurTeam />
      <Testimonials />
      <OurAwards />
      <ScheduleVisit />
      <NewsArticles />
      <InstagramSection />
    </>
  );
}
