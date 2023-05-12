import React, { useEffect, useRef, useState } from "react";
import styles from "./GlitchSplashScreen.module.css";
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import useSound from "use-sound";
import { Howl } from "howler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, setUserInfoAction } from "../../redux";

export default function GlitchSplashScreen() {
  // input 태그 자동 포커스 ===============
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);

  useEffect(() => {
    idInputRef.current.focus();
  }, []);
  // ===================================

  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  console.log("아이디 검문소", inputId);
  console.log("비밀번호 검문소", inputPw);

  const [existingId, setExistingId] = useState(false);
  const [correctPw, setCorrectPw] = useState(false);

  const handleSubmitId = () => {
    axios
      .post(`http://localhost:5000/users/idCheck`, {
        // url: "http://localhost:5000/users/idCheck", // 안되는뎅
        method: "POST",
        withCredentials: true,
        data: {
          inputId: inputId, // 생략 가능하지만 혼동 방지를 위해서 비생략.
        },
      })
      .then((response) => {
        console.log("존재하는 계정입니다.");
        setExistingId(true);
        pwInputRef.current.focus();
      })
      .catch((error) => {
        console.log("에러코드", error.response.status, error.response.data);
      });
  };

  const handleSubmitPw = () => {
    axios
      .post(`http://localhost:5000/users/pwCheck`, {
        method: "POST",
        withCredentials: true,
        data: {
          inputId: inputId,
          inputPw: inputPw,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            console.log("존재하지 않는 비번입니다.");
          } else {
            console.log("존재하는 비번입니다.");
            setCorrectPw(true);
            setTimeout(() => {
              navigate("/users/access");
            }, 500);
            setInputId(""); // 혹시 남아있을까봐
            setInputPw(""); // 혹시 남아있을까봐
          }
          console.log(response);
        } else {
          console.log("Not 200", response);
        }
        //

        //
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const idCheck = (e) => {
    if (e.key === "Enter") {
      handleSubmitId();
    }
  };

  const pwCheck = (e) => {
    if (e.key === "Enter") {
      handleSubmitPw();
    }
  };
  // 회원가입 여부와 회원정보 리덕스에 저장  =======================================
  const dispatch = useDispatch();

  useEffect(() => {
    // const accessToken = () => {
    axios
      .get(`http://localhost:5000/users/accesstoken`, {
        method: "GET",
        withCredentials: true,
      })
      .then((response) => {
        // setIsLogin(true);
        dispatch(loginAction(true));
        dispatch(setUserInfoAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    // };
  }, [correctPw]);

  const refreshToken = () => {
    axios.get(`http://localhost:5000/users/refreshtoken`, {
      method: "GET",
      withCredentials: true,
    });
  };

  // ======================================================================

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
          correctPw
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
          correctPw
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
              onChange={handleInputId}
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
              onChange={handleInputPw}
            />
            <div className={styles.pwBlock1}></div>
          </div>
          <div className={styles.pwBlock2}></div>
        </div>
      </div>
      {/* ====================================================================== */}
      {/* <div>
        <button onClick={accessToken} style={{ cursor: "pointer" }}>
          액세스
        </button>
        <button onClick={refreshToken} style={{ cursor: "pointer" }}>
          리프레쉬
        </button>
        <button onClick={logout} style={{ cursor: "pointer" }}>
          로그아웃
        </button>
      </div>
      {isLoggedIn.isLoggedIn ? (
        <p>{`반갑습니다. ${userInfo.userInfo.name}님`}</p>
      ) : (
        <p>로그아웃 상태</p>
      )
      } */}
    </div>
  );
}
