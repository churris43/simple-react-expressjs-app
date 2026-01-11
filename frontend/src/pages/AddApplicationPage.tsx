import { redirect } from "react-router-dom";
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

// 1. The Action function (usually in the same file or a separate 'actions.js')
// This runs when the form is submitted
export async function action({ request }) {
  const formData = await request.formData();

  // Extract data using the 'name' attributes from the HTML fields
  const submission = {
    companyName: formData.get("companyName"),
    ad: formData.get("ad"),
    create_time: formData.get("create_time"),
  };

  try {
    const res = await fetch("/api/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    console.log(res.status);
    if (res.status != 201) {
      return { success: false };
    }
    return redirect("/applications");
  } catch (error) {
    return { success: false };
  }
}

function AddApplicationPage() {
  const actionData = useActionData(); // Access response from the action above
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
          />
        </div>

        <div>
          <label htmlFor="ad">Ad:</label>
          <textarea id="ad" name="ad" className="border-1" required></textarea>
        </div>

        <div>
          <label htmlFor="create_time">Date and Time:</label>
          <input
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
            {isSubmitting ? "Saving..." : "Submit Ad"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AddApplicationPage;
