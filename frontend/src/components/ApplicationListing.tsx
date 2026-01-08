import React, { Fragment } from "react";

function ApplicationListing({ job }) {
  return (
    <Fragment key={job.id}>
      <p>Id:{job.id}</p>
      <p>Title: {job.title}</p>
      <a href={`/application/${job.id}`} className="underline">
        View Job
      </a>
    </Fragment>
  );
}

export default ApplicationListing;
