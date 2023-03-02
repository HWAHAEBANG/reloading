import React from "react";
import styles from "./InputId.module.css";
import TypeWriterEffect from "react-typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function InputId() {
  const navigate = useNavigate();

  const valueCheck = (e) => {
    e.key === "Enter" && navigate("/pw");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <TypeWriterEffect
            textStyle={{
              fontFamily: "PixelCaps",
              fontSize: "21.5px",
            }}
            startDelay={500}
            cursorColor={"#03e9f4"}
            text='ENTER IDENTITY'
            typeSpeed={40}
            // scrollArea={myAppRef}
          />
        </div>
        <div className={styles.outLine}>
          <div className={styles.inputContainer}>
            <input type='text' autoFocus onKeyDown={valueCheck} />
            <div className={styles.block2}></div>
          </div>
          <div className={styles.block1}></div>
        </div>
      </div>
    </div>
  );
}
