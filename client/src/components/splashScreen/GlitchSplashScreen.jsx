import React, { useEffect, useRef, useState } from "react";
import styles from "./GlitchSplashScreen.module.css";
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import useSound from "use-sound";
import { Howl } from "howler";

export default function GlitchSplashScreen() {
  // input 태그 자동 포커스 ===============
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);

  useEffect(() => {
    idInputRef.current.focus();
  }, []);
  // ===================================

  const navigate = useNavigate();

  const [existingId, setExistingId] = useState(false);
  const [rightPw, setRightPw] = useState(false);

  const idCheck = (e) => {
    if (e.key === "Enter") {
      setExistingId(true);
      pwInputRef.current.focus();
    }
  };

  const pwCheck = (e) => {
    if (e.key === "Enter") {
      setRightPw(true);
      setTimeout(() => {
        navigate("/users/access");
      }, 500);
    }
  };

  // sound effect =======================================================
  const [startSound, setStartSound] = useState(false);
  const [playActive] = useSound("/sounds/faidin.mp3", { volume: 0.25 });

  setTimeout(() => {
    setStartSound(true);
  }, 1000);

  startSound && playActive(); //?
  // ======================================================================

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          rightPw
            ? `${styles.logoArea} ${styles.rightPwTpye1ForLogin}`
            : styles.logoArea
        }
      >
        <div className={styles.box}>
          <h2 className={styles.text}>RE LOADING</h2>
          <h3 className={styles.subText}>
            <span>R</span>eal <span>E</span>state Market Price Wactchtower
          </h3>
        </div>
      </div>

      {/* ============================================ */}
      <div
        className={
          rightPw
            ? `${styles.loginArea} ${styles.rightPwTpye1ForLogin}`
            : styles.loginArea
        }
      >
        <div
          className={
            existingId
              ? `${styles.idContainer} ${styles.existingIdType0ForId}`
              : styles.idContainer
          }
        >
          <div
            className={
              existingId
                ? `${styles.idTitle} ${styles.existingIdType1ForId}`
                : styles.idTitle
            }
          >
            <TypeWriterEffect
              textStyle={{
                fontFamily: "PixelCaps",
                fontSize: "21.5px",
                lineHeight: "0px",
              }}
              startDelay={500}
              // cursorColor={"mediumaquamarine"}
              text='ENTER IDENTITY'
              typeSpeed={40}
              // scrollArea={myAppRef}
            />
          </div>
          <div
            className={
              existingId
                ? `${styles.idOutLine} ${styles.existingIdType2ForId}`
                : styles.idOutLine
            }
          ></div>
          <div className={styles.idInputContainer}>
            <input
              className={
                existingId
                  ? `${styles.idInput} ${styles.existingIdType3ForId}`
                  : styles.idInput
              }
              type='text'
              ref={idInputRef}
              onKeyDown={idCheck}
            />
            <div className={styles.idBlock1}></div>
          </div>
          <div className={styles.idBlock2}></div>
        </div>
        {/* ============================================================= */}
        <div
          className={
            existingId
              ? `${styles.pwContainer} ${styles.existingIdType0ForPw}`
              : styles.pwContainer
          }
        >
          <div
            className={
              existingId
                ? `${styles.pwTitle} ${styles.existingIdType1ForPw}`
                : styles.pwTitle
            }
          >
            <TypeWriterEffect
              textStyle={{
                fontFamily: "PixelCaps",
                fontSize: "21.5px",
                lineHeight: "0px",
              }}
              startDelay={500}
              // cursorColor={"#03e9f4"}
              text='ENTER PASSWORD'
              typeSpeed={20}
              // scrollArea={myAppRef}
            />
          </div>
          <div
            className={
              existingId
                ? `${styles.pwOutLine} ${styles.existingIdType2ForPw}`
                : styles.pwOutLine
            }
          ></div>
          <div className={styles.pwInputContainer}>
            <input
              className={
                existingId
                  ? `${styles.pwInput} ${styles.existingIdType3ForPw}`
                  : styles.pwInput
              }
              type='password'
              ref={pwInputRef}
              onKeyDown={pwCheck}
            />
            <div className={styles.pwBlock1}></div>
          </div>
          <div className={styles.pwBlock2}></div>
        </div>
      </div>
      {/* ====================================================================== */}
    </div>
  );
}
