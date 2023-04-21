import React from "react";
import styles from "./TopBar.module.css";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export default function TopBar({ showNav, setShowNav }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.navBtn}
        onClick={() => setShowNav((prev) => !prev)}
      >
        {showNav ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
      </div>
      <div className={styles.logoBox}>
        <h2 className={styles.logo1}>RE:LOADING</h2>
        <RxCross2 className={styles.crossIcon} />
        <img
          className={styles.logo2}
          src={process.env.PUBLIC_URL + "/image/logo.png"}
          alt='외않되'
        />
      </div>
    </div>
  );
}
