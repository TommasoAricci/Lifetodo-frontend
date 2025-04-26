import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreProvider } from "./store";
import "./style/index.scss";
import Wall from "./pages/Wall";
import Thoughts from "./pages/Thoughts";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Authentication from "./middleware/Authentication";
import Logout from "./pages/Logout";
import Account from "./pages/Account";
import Music from "./pages/Music";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Reset from "./pages/Reset";
import { HelmetProvider } from "react-helmet-async";

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
    path: "/account",
    element: (
      <Authentication>
        <Account />
      </Authentication>
    ),
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
  {
    path: "/music",
    element: (
      <Authentication>
        <Music />
      </Authentication>
    ),
  },
  {
    path: "/books",
    element: (
      <Authentication>
        <Books />
      </Authentication>
    ),
  },
  {
    path: "/movies",
    element: (
      <Authentication>
        <Movies />
      </Authentication>
    ),
  },
  {
    path: "reset",
    element: <Reset />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <StoreProvider>
      <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
      </React.StrictMode>
    </StoreProvider>
  </HelmetProvider>
);
