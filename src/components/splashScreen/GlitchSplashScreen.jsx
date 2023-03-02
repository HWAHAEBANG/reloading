import React from "react";
import styles from "./GlitchSplashScreen.module.css";
import { useNavigate } from "react-router-dom";

export default function GlitchSplashScreen() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/id");
  }, 5000);

  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <h2 className={styles.text}>RE LOADING</h2>
        <h3 className={styles.subText}>
          <span>R</span>eal <span>E</span>state Market Price Wactchtower
        </h3>
      </div>
    </div>
  );
}
