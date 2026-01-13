import ApplicationListings from "../components/ApplicationListings";

function ApplicationsPage() {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <ApplicationListings isHome={false} />;
    </section>
  );
}

export default ApplicationsPage;
