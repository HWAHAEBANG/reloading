import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlitchSplashScreen from "./components/splashScreen/GlitchSplashScreen";
import PassRoute from "./components/passRoute/PassRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InputId from "./components/login/InputId";
import NotFound from "./pages/NotFound";
import InputPw from "./components/login/InputPw";
import Dashboard from "./components/dashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <GlitchSplashScreen />,
      },
      {
        path: "/id",
        element: <InputId />,
      },
      {
        path: "/pw",
        element: <InputPw />,
      },
      {
        path: "/pass",
        element: <PassRoute />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
