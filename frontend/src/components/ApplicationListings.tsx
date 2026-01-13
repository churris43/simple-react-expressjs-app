import { useEffect, useState } from "react";
import ApplicationListing from "./ApplicationListing";
import Spinner from "./Spinner";
import type { Application } from "../models/Application";

interface ApplicationListingsProps {
  isHome: boolean;
}

function ApplicationListings({ isHome }: ApplicationListingsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("api/application");
        const data = await res.json();
        const slicedData = isHome ? data.slice(0, 3) : data;
        setApplications(slicedData);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Applications" : "Browse Applications"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((application) => (
              <ApplicationListing
                key={application.id}
                application={application}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ApplicationListings;
