import React, { Fragment, useEffect, useState } from "react";
import ApplicationListing from "./ApplicationListing";

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
        setApplications(data);
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
        <h2>Loading</h2>
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
