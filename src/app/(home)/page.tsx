import React from "react";

import { HeroSection } from "./_components/hero";
import { AboutUs } from "./_components/about-us";
import { OurTeam } from "./_components/our-team";
import { OurClients } from "./_components/our-clients";
import { Testimonials } from "./_components/testimonials";
import { OngoingProjects } from "./_components/ongoing-projects";
import { FeaturedListings } from "./_components/featured-listings";
import { OurAwards } from "./_components/our-awards";
import { ScheduleVisit } from "./_components/schedul-visit";
import { NewsArticles } from "./_components/news-articles";

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
    </>
  );
}
