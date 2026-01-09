import { Fragment, useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

function ApplicationListing({ application }) {
  const [showFullAd, setShowFullDescription] = useState(false);

  let ad = application.ad;

  if (!showFullAd) {
    ad = ad.substring(0, 90) + "...";
  }

  return (
    <Fragment key={application.id}>
      <p>Id:{application.id}</p>
      <p>Ad: {ad}</p>
      <button onClick={() => setShowFullDescription((prevState) => !prevState)}>
        {showFullAd ? "Less" : "More"}
      </button>
      <Link to={`/application/${application.id}`} className="underline">
        <FaBook />
        View Application
      </Link>
    </Fragment>
  );
}

export default ApplicationListing;
