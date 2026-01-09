import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ApplicationListings from "../components/ApplicationListings";

function HomePage() {
  return (
    <>
      <Hero title="This is the Title" subtitle="This is the subtitle" />
      <HomeCards />
      <ApplicationListings sliceSize="3" />
    </>
  );
}

export default HomePage;
