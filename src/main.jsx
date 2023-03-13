import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import HomePage from "./routes/HomePage";
import ErrorPage from "./ErrorPage";
import DetailPage from "./routes/DetailPage";
import { DataProvider } from "./context/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:country",
        element: <DetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
