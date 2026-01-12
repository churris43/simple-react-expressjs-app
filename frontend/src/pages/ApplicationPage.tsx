// useLoaderData is the mehcanism to fetch the record and allows to use the function elsewhere
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  const params = useParams();
  const navigate = useNavigate(); // Add this hook

  const deleteApplication = async () => {
    const confirm: boolean = window.confirm(
      "Are you sure you want to delete the record?"
    );
    if (confirm) {
      try {
        const res = await fetch(`/api/application/${params.applicationID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status != 201) {
          return { success: false };
        }
        toast.success("Application deleted successfully");
        navigate("/applications");
      } catch (error) {
        toast.error("Unable to delete application");
        return { success: false };
      }
    }
  };

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
      <button
        className="border-2 bg-red-300"
        type="submit"
        onClick={deleteApplication}
      >
        Delete
      </button>
      <Link
        to={`/applications/edit/${params.applicationID}`}
        className="border-2 bg-gray-300"
      >
        Edit
      </Link>
    </>
  );
}

export { ApplicationPage as default, applicationLoader };
