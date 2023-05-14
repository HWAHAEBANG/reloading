import React from "react";
import styles from "./RegexInfoBoxForRegister.module.css";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function RegexInfoBoxForRegister({ textArray }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textBox}>
        {textArray &&
          textArray.map((item, index) => (
            <p key={index} className={styles.text}>
              {item}
            </p>
          ))}
      </div>
      <IoInformationCircleSharp className={styles.icon} />
    </div>
  );
}
