import { Fragment, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface Application {
  id: number;
  companyName: string;
  ad: string;
  create_time: string;
}

interface ApplicationListingProps {
  application: Application;
}

function ApplicationListing({ application }: ApplicationListingProps) {
  const [showFullAd, setShowFullDescription] = useState(false);

  // Helper function to format dates
  const formatDate = (mysqlDatetime: string): string => {
    const isoDate = mysqlDatetime.replace(" ", "T");
    return format(parseISO(isoDate), "dd/MM/yyyy HH:mm a");
  };

  let ad = application.ad;

  if (!showFullAd) {
    ad = ad.substring(0, 90) + "...";
  }

  return (
    <Fragment key={application.id}>
      <div className="bg-white rounded-xl shadow-md relative">
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-xl font-bold">{application.companyName}</h3>
          </div>

          <div className="mb-5 text-gray-600 text-lg whitespace-pre-wrap">
            {ad}
          </div>

          <button
            className="text-indigo-500 mb-5 hover:text-indigo-600"
            onClick={() => setShowFullDescription((prevState) => !prevState)}
          >
            {showFullAd ? "Less" : "More"}
          </button>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="mb-3">
              <FaCalendar className="inline text-lg mb-1 mr-1" />
              {formatDate(application.create_time)}
            </div>
            <Link
              to={`/applications/${application.id}`}
              className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              View Application
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ApplicationListing;
