// useLoaderData is the mehcanism to fetch the record and allows to use the function elsewhere
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

async function applicationLoader({ params }) {
  try {
    const res = await fetch(`/api/application/${params.applicationID}`);
    if (!res.ok) {
      throw new Error("Failed to fetch application");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function ApplicationPage() {
  const application = useLoaderData();

  return (
    <>
      <Link to="/applications" className="underline">
        Back to List
      </Link>
      <h1>Id: {application.companyName} </h1>
      <br />
      <p>{application.ad} </p>
      <br />
      <p>{application.create_time}</p>
    </>
  );
}

export { ApplicationPage as default, applicationLoader };
