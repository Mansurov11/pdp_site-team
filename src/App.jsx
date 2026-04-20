import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage"; // Import your new Landing Page
import Dashboard from "./pages/Dashboard/Dashboard";
import Classes from "./pages/Classes/Classes";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Statistics from "./pages/Statistics/Statistics";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      // The Landing Page is now the first thing people see
      path: "/",
      element: <LandingPage />,
    },
    {
      // Move Login to its own explicit path
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "classes",
          element: <Classes />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      // If someone enters a wrong URL, send them to the Landing Page
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;