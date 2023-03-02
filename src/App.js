import logo from "./logo.svg";
import "./App.css";
import GlitchSplashScreen from "./components/splashScreen/GlitchSplashScreen";
import InputId from "./components/login/InputId";
import InputPw from "./components/login/InputPw";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
