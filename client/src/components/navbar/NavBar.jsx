import React from "react";
import styles from "./NavBar.module.css";

const MENU = [
  "About RE:LOADING",
  "월급쟁이부자들",
  "모든 그래프",
  "이시각 주요 뉴스",
  "menu5",
  "menu6",
  "menu7",
  "menu8",
];

const menuStyles = [styles.menu1, styles.menu2, styles.menu3];

export default function NavBar({ showNav }) {
  return (
    <div
      className={`${styles.mainContainer} ${showNav ? styles.contents : ""}`}
    >
      {MENU.map((item, index) => (
        <p key={index} className={menuStyles[index]}>
          {item}
        </p>
      ))}
    </div>
  );
}
