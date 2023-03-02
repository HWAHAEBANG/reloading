import React from "react";
import styles from "./GlitchSplashScreen.module.css";

export default function GlitchSplashScreen() {
  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <h2 className={styles.text}>RE LOADING</h2>
        <h3 className={styles.subText}>Real Estate Market Price Wactchtower</h3>
      </div>
    </div>
  );
}
