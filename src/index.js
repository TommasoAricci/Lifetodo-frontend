import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation} from "react-router-dom";
import { StoreProvider } from "./store";
import "./style/index.scss";
import App from "./pages/App";
import Bacheca from "./pages/Bacheca";
import Thoughts from "./pages/Thoughts";
import Todos from "./pages/Todos";
import Work from "./pages/Todos";

// Definisci le rotte
const router = createBrowserRouter([
  {
    path: "/",
    element: <Bacheca />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
  {
    path: "/thoughts",
    element: < Thoughts/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
    </React.StrictMode>
  </StoreProvider>
);
