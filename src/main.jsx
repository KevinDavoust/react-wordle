import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import { LettersProvider } from "./context/LettersContext";

const word = () =>
  fetch("https://trouve-mot.fr/api/size/5")
    .then((res) => res.json())
    .then((data) => data[0].name);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => word(),
    id: "app",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LettersProvider>
      <RouterProvider router={router} />
    </LettersProvider>
  </React.StrictMode>
);
