import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import ApplicationsPage from "./pages/ApplicationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ApplicationPage, { applicationLoader } from "./pages/ApplicationPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="applications" element={<ApplicationsPage />} />
      <Route
        path="applications/:applicationID"
        element={<ApplicationPage />}
        loader={applicationLoader}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
