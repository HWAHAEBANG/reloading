import React from "react";
import styles from "./Access.module.css";
import TypeWriterEffect from "react-typewriter-effect";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Access() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 8000);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.GrantText}>
        <TypeWriterEffect
          textStyle={{
            fontFamily: "PixelCaps",
            fontSize: "21.5px",
            lineHeight: "0px",
          }}
          startDelay={500}
          // cursorColor={"#03e9f4"}
          text='ACCESS GRANTED'
          typeSpeed={20}
          // scrollArea={myAppRef}
        />
      </div>
      {/* ====================================================================== */}
      {/* innerBOx 안에 넣으면 애니메이션 버벅거림이 있어서, 따로 뺐음 */}
      <div className={styles.avatarBox}>
        <img
          className={styles.avatar}
          src={process.env.PUBLIC_URL + "/image/HHB.jpg"}
          alt='프로필 사진'
        />
      </div>
      <div className={styles.WelcomeText}>
        <div className={styles.topText}>
          <TypeWriterEffect
            textStyle={{
              fontFamily: "PixelCaps",
              fontSize: "21.5px",
              lineHeight: "0px",
            }}
            startDelay={4000}
            // cursorColor={"#03e9f4"}
            text='HELLO, 화해방'
            typeSpeed={20}
            // scrollArea={myAppRef}
          />
        </div>
        <div className={styles.standardBox}>
          <span className={styles.cross}>
            <BsPlusLg />
          </span>
          <span className={styles.cross}>
            <BsPlusLg />
          </span>
          <span className={styles.cross}>
            <BsPlusLg />
          </span>
          <span className={styles.cross}>
            <BsPlusLg />
          </span>
          <div className={styles.grid}></div>
          <div className={styles.grid}></div>
          <div className={styles.grid}></div>
          <div className={styles.grid}></div>

          <div className={styles.outerBox}>
            <span className={styles.cross}>
              <BsPlusLg />
            </span>
            <span className={styles.cross}>
              <BsPlusLg />
            </span>
            <span className={styles.cross}>
              <BsPlusLg />
            </span>
            <span className={styles.cross}>
              <BsPlusLg />
            </span>
          </div>
          <div className={styles.subOuterBox}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.innerBox}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.bottomText}>
          <TypeWriterEffect
            textStyle={{
              fontFamily: "PixelCaps",
              fontSize: "21.5px",
              lineHeight: "0px",
            }}
            startDelay={4500}
            // cursorColor={"#03e9f4"}
            text='WELCOME BACK'
            typeSpeed={20}
            // scrollArea={myAppRef}
          />
        </div>
      </div>
    </div>
  );
}
