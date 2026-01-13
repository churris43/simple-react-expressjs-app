import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ApplicationListings from "../components/ApplicationListings";

function HomePage() {
  return (
    <>
      <Hero
        title="Manage your applications"
        subtitle="This is a sample of a CRUD application to manage job applications built for learning purposess where ."
      />
      <HomeCards />
      <ApplicationListings isHome={true} />
    </>
  );
}

export default HomePage;
