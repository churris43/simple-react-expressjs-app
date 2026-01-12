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
      <Form method="post">
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="border-1"
            required
            defaultValue={application.companyName}
          />
        </div>

        <div>
          <label htmlFor="ad">Ad:</label>
          <textarea
            id="ad"
            name="ad"
            className="border-1"
            required
            defaultValue={application.ad}
          />
        </div>

        <div>
          <label htmlFor="create_time">Date and Time:</label>
          <input
            defaultValue={displayDate}
            type="datetime-local"
            id="create_time"
            name="create_time"
            className="border-1"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-200 border-2"
          >
            {isSubmitting ? "Saving..." : "Submit Application"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default EditApplicationPage;
