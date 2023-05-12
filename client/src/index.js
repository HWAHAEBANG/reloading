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
import DashboardSection from "./pages/DashboardSection";
import AboutUsSection from "./pages/AboutUsSection";
import AllChartsSection from "./pages/AllChartsSection";
import MyChartsSection from "./pages/MyChartsSection";
import TopicNewsSection from "./pages/TopicNewsSection";
import LoginSection from "./pages/LoginSection";
import SignupSection from "./pages/SignupSection";
import FindIdSection from "./pages/FindIdSection";
import FindPwSection from "./pages/FindPwSection";
import EditUserInfoSection from "./pages/EditUserInfoSection";
import ChartDetail from "./components/chart-detail/ChartDetail";
import Access from "./components/splashScreen/Access";
import { Provider } from "react-redux";
import store from "./redux/store";

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
        element: <DashboardSection />,
      },
      {
        path: "/aboutUs",
        element: <AboutUsSection />,
      },
      {
        path: "/allCharts",
        element: <AllChartsSection />,
      },
      {
        path: "/myCharts",
        element: <MyChartsSection />,
      },
      {
        path: "/topicNews",
        element: <TopicNewsSection />,
      },
      {
        path: "/users/editUserInfo",
        element: <EditUserInfoSection />,
      },
      {
        path: "/allCharts/:id",
        element: <ChartDetail />,
      },
    ],
  },
  {
    path: "/users/login",
    element: <LoginSection />,
  },
  {
    path: "/users/access",
    element: <Access />,
  },
  {
    path: "/users/findId",
    element: <FindIdSection />,
  },
  {
    path: "/users/findPw",
    element: <FindPwSection />,
  },
  {
    path: "/users/signup",
    element: <SignupSection />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
