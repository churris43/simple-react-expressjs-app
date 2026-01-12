import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ApplicationListings from "../components/ApplicationListings";

function HomePage() {
  return (
    <>
      <Hero
        title="Manage your applications"
        subtitle="This is a sample application built for learning purposess."
      />
      <HomeCards />
      <ApplicationListings isHome={true} />
    </>
  );
}

export default HomePage;
