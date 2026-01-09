import React, { Fragment } from "react";
import Jobs from "../jobs.json";
import ApplicationListing from "./ApplicationListing";

function ApplicationListings({ isHome }) {
  const jobsToDisplay = isHome ? Jobs.slice(0, 3) : Jobs;
  return (
    <div>
      {jobsToDisplay.map((job) => (
        <ApplicationListing key={job.id} job={job} />
      ))}
    </div>
  );
}

export default ApplicationListings;
