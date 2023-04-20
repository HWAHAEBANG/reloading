import React from "react";
import styles from "./TopBar.module.css";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

export default function TopBar({ showNav, setShowNav }) {
  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <div
          className={styles.navBtn}
          onClick={() => setShowNav((prev) => !prev)}
        >
          {showNav ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
        </div>
        <h2 className={styles.title}>RE LOADING</h2>
      </div>
    </div>
  );
}
