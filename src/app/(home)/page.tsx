import React from "react";

import { HeroSection } from "./_components/hero";
import { AboutUs } from "./_components/about-us";
import { FeaturedListings } from "./_components/featured-listings";

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
    </>
  );
}
