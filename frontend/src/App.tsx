import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCards from "./components/HomeCards";
import ApplicationListings from "./components/ApplicationListings";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero title="This is the Title" subtitle="This is the subtitle" />
      <HomeCards />
      <ApplicationListings sliceSize="3" />
    </>
  );
};

export default App;
