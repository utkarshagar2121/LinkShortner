import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/ApplAyout";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import Auth from "./Pages/Auth";
import Link from "./Pages/Link";
import Redirectlink from "./Pages/Redirectlink";
import UrlProvider from "./Context";
import requireAuth from "./components/requireAuth";
import RequireAuth from "./components/requireAuth";
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: <Redirectlink />,
        },
      ],
    },
  ]);
  return (
    <UrlProvider>
      <div>
        <RouterProvider router={router}></RouterProvider>;
      </div>
    </UrlProvider>
  );
}

export default App;
