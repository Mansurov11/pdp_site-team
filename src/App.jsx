import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Classes from "./pages/Classes/Classes";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/TeacherClassDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
         {
          path: "classes",
          element: <Classes />,
        },
         {
          path: "students",
          element: <Students />,
        },
        {
          path: "teachers",
          element: <Teachers />,
        },
      ],
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
