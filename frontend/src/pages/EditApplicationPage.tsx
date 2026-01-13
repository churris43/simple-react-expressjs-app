import {
  useLoaderData,
  useParams,
  Form,
  useNavigation,
  Link,
  redirect,
} from "react-router-dom";
import { toast } from "react-toastify";

export async function action({ request, params }) {
  const formData = await request.formData();

  // Extract data using the 'name' attributes from the HTML fields
  const submission = {
    companyName: formData.get("companyName"),
    ad: formData.get("ad"),
    create_time: formData.get("create_time"),
  };

  try {
    const res = await fetch("/api/application/" + params.applicationID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (res.status != 201) {
      toast.error("Unable to edit application");
      return { success: false };
    }
    toast.success("Application edit successfully");
    return redirect("/applications/" + params.applicationID);
  } catch (error) {
    toast.error("Unable to add application");
    return { success: false };
  }
}

function EditApplicationPage() {
  const application = useLoaderData();

  const params = useParams();

  const displayDate: string = application.create_time.substring(0, 16);

  const navigation = useNavigation(); // Track loading/submitting state

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <Form method="post">
              <h2 className="text-3xl text-center font-semibold mb-6">
                Edit Application
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name:
                </label>
                <input
                  type="text"
                  defaultValue={application.companyName}
                  id="companyName"
                  name="companyName"
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ad"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Ad:
                </label>
                <textarea
                  id="ad"
                  defaultValue={application.ad}
                  name="ad"
                  className="border rounded w-full py-2 px-3"
                  rows={7}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="create_time"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Date and Time:
                </label>
                <input
                  type="datetime-local"
                  defaultValue={displayDate}
                  id="create_time"
                  name="create_time"
                  className="block text-gray-700 font-bold mb-2"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white mb-2 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block"
                >
                  {isSubmitting ? "Saving..." : "Submit Application"}
                </button>
                <Link
                  to={`/applications/${params.applicationID}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block text-center"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditApplicationPage;
