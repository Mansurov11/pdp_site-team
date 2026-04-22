import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout and Core Pages
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";

// Feature Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Classes from "./pages/Classes/Classes";
import ClassDetail from "./pages/Classes/ClassDetail";
import CreateClass from "./pages/Classes/CreateClass";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Statistics from "./pages/Statistics/Statistics";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// --- FIX: MOVE THIS OUTSIDE THE APP COMPONENT ---
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
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "classes", element: <Classes /> },
      { path: "classes/create", element: <CreateClass /> },
      { path: "classes/:id", element: <ClassDetail /> }, // Absolute path will be /home/classes/:id
      { path: "history", element: <History /> },
      { path: "statistics", element: <Statistics /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;