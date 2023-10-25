import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateDubPage from "./pages/CreateDubPage";
import TrainPage from "./pages/TrainPage";
import LoginPage from "./pages/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  // main - 생성한 더빙 목록 조회
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/create",
    element: <CreateDubPage />,
  },
  {
    path: "/train",
    element: <TrainPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);

root.render(<RouterProvider router={router} />);
