// import "./App.css";
import GlitchSplashScreen from "./components/splashScreen/GlitchSplashScreen";
import InputId from "./components/login/InputId";
import InputPw from "./components/login/InputPw";
import { Outlet } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import NavBar from "./components/navbar/NavBar";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <NavBar setShowNav={setShowNav} /> {/* 메뉴 늘렀을 때 사라져야하므로 */}
      <div
        className={`${styles.subContainer} ${showNav ? styles.showNavBar : ""}`}
      >
        <TopBar showNav={showNav} setShowNav={setShowNav} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
