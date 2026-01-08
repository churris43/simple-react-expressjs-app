import React, { Fragment } from "react";
import Jobs from "../jobs.json";
import ApplicationListing from "./ApplicationListing";

function ApplicationListings({ sliceSize }) {
  const recentjobs = Jobs.slice(0, sliceSize);
  return (
    <div>
      {recentjobs.map((job) => (
        <ApplicationListing key={job.id} job={job} />
      ))}
    </div>
  );
}

export default ApplicationListings;
