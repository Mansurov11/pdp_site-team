import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Classes from "./pages/Classes/Classes";
import Students from "./pages/Students/Students";

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
      ],
    },
  ]);

  return (
    <>
      <p>hello world</p>
    </>
  );
}

export default App;
