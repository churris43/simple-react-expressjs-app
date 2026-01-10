import { Fragment, useEffect, useState } from "react";
import ApplicationListing from "./ApplicationListing";
import Spinner from "./Spinner";

function ApplicationListings({ isHome }) {
  const [applications, setApplications] = useState([]);
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
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {applications.map((application) => (
            <ApplicationListing
              key={application.id}
              application={application}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ApplicationListings;
