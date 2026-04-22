import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import Classes from "./pages/Classes/Classes";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Statistics from "./pages/Statistics/Statistics";
import { ToastContainer } from "react-toastify";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const router = createBrowserRouter([
    {

      path: "/",
      element: <LandingPage />,
    },
    {

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

      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;