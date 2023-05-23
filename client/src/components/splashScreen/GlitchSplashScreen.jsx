import React, { useEffect, useRef, useState } from "react";
import styles from "./GlitchSplashScreen.module.css";
import { Link, useNavigate } from "react-router-dom";
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
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  /** 굳이 한번 더 변수를 저장하는 이유 (보류)
   * 아이디를 입력하고 엔터를 누른 뒤 빠르게 비밀 번호를 이어서 입력 할 경우,
   * 비밀번호로 커서 넘어가기 전에 입력되어, 잘못 된 아이디가 전송됨.
   * 이를 방지하기 위해, 엔터를 누르는 순간의 input 값을 저장해두도록 별도의 변수를 저장한것.
   */
  // const [finalInputValue, setFinalInputValue] = useState({ id: "", pw: "" });

  const handleInputId = (e) => {
    keyboard();
    setInputId(e.target.value.toLowerCase());
  };

  const handleInputPw = (e) => {
    keyboard();
    setInputPw(e.target.value);
  };

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
        faidIn();
        console.log("존재하는 계정입니다.");
        setExistingId(true);
        pwInputRef.current.focus();
        setAlertMessage("");
      })
      .catch((error) => {
        wrong();
        setAlertMessage("존재하지 않는 계정입니다.");
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
        faidIn();
        setTimeout(() => access(), 1000);
        setTimeout(() => disk(), 10000);
        setAlertMessage("");
        getAccessToken();
        // getRefreshToken(); 없어도 되지 않나

        setCorrectPw(true);
        setTimeout(() => {
          navigate("/users/access");
        }, 500);

        setInputId(""); // 혹시 남아있을까봐
        setInputPw(""); // 혹시 남아있을까봐
      })
      .catch((error) => {
        wrong();
        setAlertMessage("비밀번호가 일치하지 않습니다.");
      });
  };

  const idCheck = (e) => {
    if (e.keyCode === 13) {
      handleSubmitId();
    }
  };

  const pwCheck = (e) => {
    if (e.keyCode === 13) {
      handleSubmitPw();
    }
  };
  // 회원가입 여부와 회원정보 리덕스에 저장  =======================================

  const getAccessToken = () => {
    axios
      .get(`http://localhost:5000/users/accesstoken`, {
        method: "GET",
        withCredentials: true,
      })
      .then((response) => {
        // setIsLogin(true);
        dispatch(loginAction() /* (true) */); // true 왜썼음?
        dispatch(setUserInfoAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ======================================================================

  // sound effect =======================================================

  const [keyboard] = useSound("/sounds/keyboard.wav", { volume: 0.25 });
  const [wrong] = useSound("/sounds/wrong.mp3", { volume: 0.25 });
  const [faidIn] = useSound("/sounds/faidin.mp3", { volume: 0.25 });
  const [access] = useSound("/sounds/access.mp3", { volume: 0.25 });
  const [disk] = useSound("/sounds/disk.wav", { volume: 1 });
  const [move] = useSound("/sounds/move.wav", { volume: 0.25 });

  // setTimeout(() => {
  //   setStartSound(true);
  // }, 1000);

  // startSound && playActive(); //?
  // ======================================================================

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          isLoggedIn.isLoggedIn
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
          isLoggedIn.isLoggedIn
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
              value={inputId}
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
                ? correctPw
                  ? styles.pwTitle
                  : `${styles.pwTitle} ${styles.existingIdType1ForPw}`
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
                ? correctPw
                  ? styles.pwOutLine
                  : `${styles.pwOutLine} ${styles.existingIdType2ForPw}`
                : styles.pwOutLine
            }
          ></div>
          <div className={styles.pwInputContainer}>
            <input
              className={
                existingId
                  ? correctPw
                    ? styles.pwInput
                    : `${styles.pwInput} ${styles.existingIdType3ForPw}`
                  : styles.pwInput
              }
              type='password'
              ref={pwInputRef}
              value={inputPw}
              onKeyDown={pwCheck}
              onChange={handleInputPw}
            />
            <div className={styles.pwBlock1}></div>
          </div>
          <div className={styles.pwBlock2}></div>
        </div>
        <p className={styles.alert}>{alertMessage}</p>
      </div>
      {/* ====================================================================== */}
      {existingId ? (
        <button
          className={
            existingId
              ? correctPw
                ? styles.confirmPw
                : `${styles.confirmPw} ${styles.existingIdType3ForPw}`
              : styles.confirmPw
          }
          onClick={handleSubmitPw}
        >
          confirm PW
        </button>
      ) : (
        <button
          className={
            existingId
              ? correctPw
                ? styles.confirmId
                : `${styles.confirmId} ${styles.existingIdType1ForPw}`
              : styles.confirmId
          }
          onClick={handleSubmitId}
        >
          confirm ID
        </button>
      )}
      <div className={styles.linkContainer}>
        <p className={styles.link}>
          Forgot{" "}
          <Link to='/users/findId' onClick={() => move()}>
            ID
          </Link>{" "}
          or{" "}
          <Link to='/users/findPw' onClick={() => move()}>
            Password?
          </Link>
        </p>
        <p className={styles.link}>
          Not Yet registered?{" "}
          <Link to='/users/signUp' onClick={() => move()}>
            Sign up
          </Link>
        </p>
      </div>
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
