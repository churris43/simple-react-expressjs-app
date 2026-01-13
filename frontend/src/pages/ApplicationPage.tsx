// useLoaderData is the mehcanism to fetch the record and allows to use the function elsewhere
import { useLoaderData, useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import type { ActionFunctionArgs } from "react-router-dom";

async function applicationLoader({ params }: ActionFunctionArgs) {
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

  // Helper function to format dates
  const formatDate = (mysqlDatetime: string): string => {
    const isoDate = mysqlDatetime.replace(" ", "T");
    return format(parseISO(isoDate), "dd/MM/yyyy HH:mm");
  };

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
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/applications"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Application Listings
          </Link>
        </div>
      </section>
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
              <h1 className="text-3xl font-bold mb-4">
                {application.companyName}
              </h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Application Ad
              </h3>

              <p className="mb-4 whitespace-pre-wrap">{application.ad}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Date and Time
              </h3>

              <p className="mb-4">{formatDate(application.create_time)}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Application</h3>
              <Link
                to={`/applications/edit/${params.applicationID}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                type="submit"
                onClick={deleteApplication}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { ApplicationPage as default, applicationLoader };
