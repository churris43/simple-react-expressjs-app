import React, { Fragment, useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <Link to={`/application/${job.id}`} className="underline">
        <FaBook />
        View Job
      </Link>
    </Fragment>
  );
}

export default ApplicationListing;
