import React from "react";
import styles from "./NavBar.module.css";

const MENU = [
  "menu1",
  "menu2",
  "menu3",
  "menu4",
  "menu5",
  "menu6",
  "menu7",
  "menu8",
];

export default function NavBar() {
  return (
    <div className={styles.mainContainer}>
      {MENU.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
