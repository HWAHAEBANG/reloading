import React from "react";
import styles from "./TopBar.module.css";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

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
        <Link to='/'>
          <h2 className={styles.logo1}>RE:LOADING</h2>
        </Link>
        <RxCross2 className={styles.crossIcon} />
        <a href='https://www.weolbu.com/' target='_blank'>
          <img
            className={styles.logo2}
            src={process.env.PUBLIC_URL + "/image/logo.png"}
            alt='월부로고'
          />
        </a>
      </div>
    </div>
  );
}
