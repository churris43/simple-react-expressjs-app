import { Fragment, useEffect, useState } from "react";
import ApplicationListing from "./ApplicationListing";
import Spinner from "./Spinner";

function ApplicationListings({ isHome }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const applicationsToDisplay = isHome
    ? applications.slice(0, 3)
    : applications;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost/api/application");
        const data = await res.json();
        const slicedData = isHome ? data.slice(0, 3) : data;
        setApplications(slicedData);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
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
