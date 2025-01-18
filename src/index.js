import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreProvider } from "./store";
import "./style/index.scss";
import App from "./pages/App";
import Wall from "./pages/Wall";
import Thoughts from "./pages/Thoughts";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Authentication from "./Authentication";
import Logout from "./Logout";

// Definisci le rotte
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/wall",
    element: (
      <Authentication>
        <Wall />
      </Authentication>
    ),
  },
  {
    path: "/todos",
    element: (
      <Authentication>
        <Todos />
      </Authentication>
    ),
  },
  {
    path: "/thoughts",
    element: (
      <Authentication>
        <Thoughts />
      </Authentication>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </StoreProvider>
);
