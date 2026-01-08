import React, { Fragment, useState } from "react";
import { FaBook } from "react-icons/fa";

function ApplicationListing({ job }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = job.description;

  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }

  return (
    <Fragment key={job.id}>
      <p>Id:{job.id}</p>
      <p>Title: {job.title}</p>
      <p>Description: {description}</p>
      <button onClick={() => setShowFullDescription((prevState) => !prevState)}>
        {showFullDescription ? "Less" : "More"}
      </button>
      <a href={`/application/${job.id}`} className="underline">
        <FaBook />
        View Job
      </a>
    </Fragment>
  );
}

export default ApplicationListing;
