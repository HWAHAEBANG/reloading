import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import RegexInfoBoxForRegister from "../ui/RegexInfoBoxForRegister";

export default function Signup() {
  const [inputValue, setInputValue] = useState({
    id: "",
    validId: false,
    nonIdDuplication: false,
    pw: "",
    validPw: false,
    pwCheck: "",
    correctPwCheck: false,
    name: "",
    nickname: "",
    validNickname: "",
    nonNicknameDuplication: false,
    emailId: "",
    emailAdress: "",
    validEmail: true, // 추후 리팩토링 예정
    profileImage: "",
    agree: false,
  });

  // 정규식 모음 객체
  const inputRegexs = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  };

  // 입력값 검증(추후 성능 테스트하여 useEffect나 useCallback 으로 리팩토링 고려 )
  const handleInputValue = (e) => {
    switch (e.target.name) {
      // ID 입력값 검증 =====================================================================================
      case "id":
        // 정규식에 부합하는 경우
        if (inputRegexs.idRegex.test(e.target.value)) {
          setInputValue((prevState) => ({ ...prevState, validId: true })); //  ...prevState 꼭 블로그 포스팅
          setPassMessage((prevState) => ({
            ...prevState,
            id: "조건을 충족하는 아이디 입니다. 중복을 확인해주세요.",
          }));
          setAlertMessage((prevState) => ({
            ...prevState,
            id: "",
          }));
        } else {
          // 정규식에 부합하지 않는 경우
          // 입력값이 존재하는 하지만 정규식에 부합하지 않는 경우
          if (e.target.value) {
            setInputValue((prevState) => ({ ...prevState, validId: false }));
            setAlertMessage((prevState) => ({
              ...prevState,
              id: "사용할 수 없는 아이디 입니다.",
            }));
            setPassMessage((prevState) => ({
              ...prevState,
              id: "",
            }));
          }
          // 입력값이 존재하지 않는 경우 (다 지워진 경우)
          else
            setAlertMessage((prevState) => ({
              ...prevState,
              id: "",
            }));
        }
        setInputValue((prevState) => ({ ...prevState, id: e.target.value }));
        break;
      // ===================================================================================================
      // PW 입력값 검증 =====================================================================================
      case "pw":
        // 정규식에 부합하는 경우
        if (inputRegexs.pwRegex.test(e.target.value)) {
          setInputValue((prevState) => ({ ...prevState, validPw: true }));
          setPassMessage((prevState) => ({
            ...prevState,
            pw: "사용할 수 있는 비밀번호 입니다.",
          }));
          setAlertMessage((prevState) => ({
            ...prevState,
            pw: "",
          }));
        } else {
          // 정규식에 부합하지 않는 경우
          // 입력값이 존재하는 하지만 정규식에 부합하지 않는 경우
          if (e.target.value) {
            setInputValue((prevState) => ({ ...prevState, validPw: false }));
            setAlertMessage((prevState) => ({
              ...prevState,
              pw: "사용할 수 없는 비밀번호 입니다.",
            }));
            setPassMessage((prevState) => ({
              ...prevState,
              pw: "",
            }));
          }
          // 입력값이 존재하지 않는 경우 (다 지워진 경우)
          else
            setAlertMessage((prevState) => ({
              ...prevState,
              pw: "",
            }));
        }
        setInputValue((prevState) => ({ ...prevState, pw: e.target.value }));
        break;
      // ===================================================================================================
      // PW Check 입력값 검증 ===============================================================================
      case "pwCheck":
        // 비밀번호 입력값과 일치하는 경우
        if (inputValue.pw === e.target.value) {
          setInputValue((prevState) => ({
            ...prevState,
            correctPwCheck: true,
          }));
          setPassMessage((prevState) => ({
            ...prevState,
            pwCheck: "비밀번호가 일치합니다.",
          }));
          setAlertMessage((prevState) => ({
            ...prevState,
            pwCheck: "",
          }));
        } else {
          // 비밀번호 입력값과 일치하지 않는 경우
          // 입력값이 존재하는 하지만 비밀번호와 일치하지 않는 경우
          if (e.target.value) {
            setInputValue((prevState) => ({
              ...prevState,
              correctPwCheck: false,
            }));
            setAlertMessage((prevState) => ({
              ...prevState,
              pwCheck: "비밀번호가 일치하지 않습니다.",
            }));
            setPassMessage((prevState) => ({
              ...prevState,
              pwCheck: "",
            }));
          }
          // 입력값이 존재하지 않는 경우 (다 지워진 경우)
          else
            setAlertMessage((prevState) => ({
              ...prevState,
              pwCheck: "",
            }));
        }
        setInputValue((prevState) => ({
          ...prevState,
          pwCheck: e.target.value,
        }));
        break;
      // ===================================================================================================
      // nickname 입력값 검증 ===============================================================================
      case "nickname":
        // 정규식에 부합하는 경우
        if (inputRegexs.nicknameRegex.test(e.target.value)) {
          setInputValue((prevState) => ({
            ...prevState,
            validNickname: true,
          }));
          setPassMessage((prevState) => ({
            ...prevState,
            nickname: "조건을 충족하는 닉네임 입니다. 중복을 확인해주세요.",
          }));
          setAlertMessage((prevState) => ({
            ...prevState,
            nickname: "",
          }));
        } else {
          // 정규식에 부합하지 않는 경우
          // 입력값이 존재하는 하지만 정규식에 부합하지 않는 경우
          if (e.target.value) {
            setInputValue((prevState) => ({
              ...prevState,
              validNickname: false,
            }));
            setAlertMessage((prevState) => ({
              ...prevState,
              nickname: "사용할 수 없는 닉네임 입니다.",
            }));
            setPassMessage((prevState) => ({
              ...prevState,
              nickname: "",
            }));
          }
          // 입력값이 존재하지 않는 경우 (다 지워진 경우)
          else
            setAlertMessage((prevState) => ({
              ...prevState,
              nickname: "",
            }));
        }
        setInputValue((prevState) => ({
          ...prevState,
          nickname: e.target.value,
        }));
        break;
      case "agree":
        setInputValue((prevState) => ({
          ...prevState,
          agree: e.target.checked,
        }));
        break;
      // ===================================================================================================
      // 검증 불필요 항목 입력값 =============================================================================
      default:
        setInputValue((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      // ===================================================================================================
    }
  };

  // 입력 조건 (정규식)설명 텍스트
  const REGEX_INFO = {
    id: [
      "영문자로 시작",
      "영문자, 숫자, 하이픈(-), 언더바(_)를 사용",
      "3~20자 이내",
    ],
    pw: [
      "최소 8자 이상",
      "최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함",
      "공백은 허용하지 않음",
    ],
    nickname: ["영어 대/소문자, 숫자, 한글 자모음 조합", "2~10자 이내"],
  };

  /**
   * 고려할 사항
   * 1. 정규식에 부합하지 않는 아이디인 경우
   * 2. 이미 존재하는 아이디인 경우
   * 3. 정규식에 부합하지 않는 비밀번호인 경우
   * 4. 비빌번호와 비빌번호환이 일치하지 않는 경우
   * 5. 정규식에 부합하지 않는 닉네임인 경우
   * 6. 이미 존재하는 닉네임인 경우
   * 7. (이메일 인증이 미실시 또는 실패한 경우)
   */

  const submitRequirements = // 아래 조건을 모두 충족할 시 제출 버튼 활성화.
    inputValue.id && // 아이디가 입력되었는가?
    inputValue.validId && // 아이디가 정규식에 부합하는가?
    inputValue.nonIdDuplication && // 아이디가 중복되지 않았는가?
    inputValue.pw && // 비밀번호가 입력되었는가?
    inputValue.validPw && // 비밀번호가 정규식에 부합하는가?
    inputValue.pwCheck && // 비밀번호가 입력되었는가?
    inputValue.correctPwCheck && // 비밀번호 확인이 비밀번호화 일치하는가?
    inputValue.name && // 이름이 입력되었는가?
    inputValue.nickname && // 닉네임이 입력되었는는가?
    inputValue.nonNicknameDuplication && // 닉네입이 중복되지 않았는가?
    inputValue.emailId && // 이메일 아이디를 입력하였는가?
    inputValue.emailAdress && // 이메일 도메인 주소를  선택하였는가?
    inputValue.validEmail && // 이메일이 인증되었는가? (추후 리팩토링 예정)
    inputValue.agree; // 정보제공에 동의 하였는가

  // 조건에 부합하지 않는 경우 빨간글씨 경고
  const [alertMessage, setAlertMessage] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    email: "",
    agree: "",
  });

  // 조건에 부합할 경우 초록글씨 경고
  const [passMessage, setPassMessage] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    email: "",
    agree: "",
  });

  //test zone ==========================================================

  const dupIdToggle = () => {
    setInputValue({
      ...inputValue,
      nonIdDuplication: true,
    });
    alert("사용할 수 있는 아이디 입니다.");

    setPassMessage((prevState) => ({
      ...prevState,
      id: "사용할 수 있는 아이디 입니다.",
    }));
    // setAlertMessage((prevState) => ({
    //   ...prevState,
    //   id: "사용할 수 없는 아이디 입니다.",
    // }));
  };

  const dupNicknameToggle = () => {
    setInputValue({
      ...inputValue,
      nonNicknameDuplication: true,
    });
    alert("사용할 수 있는 닉네임 입니다.");
    setPassMessage((prevState) => ({
      ...prevState,
      nickname: "사용할 수 있는 닉네임 입니다.",
    }));
    // setAlertMessage((prevState) => ({
    //   ...prevState,
    //   nickname: "사용할 수 없는 닉네임 입니다.",
    // }));
  };

  console.log("검증", inputValue);

  //test tool end=======================================================
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.videoSection}>
          <div className={styles.apartmentBox}>
            <img
              className={styles.pngApartment}
              src={process.env.PUBLIC_URL + "/image/apartment.jpg"}
              alt='apartment'
            />
          </div>
          <div className={styles.scopeBox}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <img
              className={styles.pngScope}
              src={process.env.PUBLIC_URL + "/image/scope.png"}
              alt='scope'
            />
          </div>
        </div>
        <div className={styles.inputSection}>
          <h1 className={styles.title}>Welcome to RE:ROADING</h1>
          <h2 className={styles.subTitle}>Creat your accout</h2>
          <div className={styles.inputBox}>
            <div>
              <label htmlFor='id'>ID * </label>
              {/* <RegexInfoBoxForRegister textArray={REGEX_INFO.id} /> */}
              <span className={styles.alertMessage}>{alertMessage.id}</span>
              <span className={styles.passMessage}>{passMessage.id}</span>
              <div>
                <input
                  className={
                    inputValue.id
                      ? `${styles.input}  ${styles.filled}`
                      : styles.input
                  }
                  type='text'
                  id='id'
                  name='id'
                  value={inputValue.id}
                  onChange={handleInputValue}
                />
                <button onClick={dupIdToggle}>중복 확인</button>
              </div>
            </div>
            <div>
              <label htmlFor='pw'>Password *</label>
              <span className={styles.alertMessage}>{alertMessage.pw}</span>
              <span className={styles.passMessage}>{passMessage.pw}</span>
              <input
                className={
                  inputValue.pw
                    ? `${styles.input}  ${styles.filled}`
                    : styles.input
                }
                type='password'
                id='pw'
                name='pw'
                value={inputValue.pw}
                onChange={handleInputValue}
              />
            </div>
            <div>
              <label htmlFor='pwCheck'>Password Check *</label>
              <span className={styles.alertMessage}>
                {alertMessage.pwCheck}
              </span>
              <span className={styles.passMessage}>{passMessage.pwCheck}</span>
              <input
                className={
                  inputValue.pwCheck
                    ? `${styles.input}  ${styles.filled}`
                    : styles.input
                }
                type='password'
                id='pwCheck'
                name='pwCheck'
                value={inputValue.pwCheck}
                onChange={handleInputValue}
              />
            </div>

            <div>
              <label htmlFor='name'>Fullname *</label>
              <input
                className={
                  inputValue.name
                    ? `${styles.input}  ${styles.filled}`
                    : styles.input
                }
                type='text'
                id='name'
                name='name'
                value={inputValue.name}
                onChange={handleInputValue}
              />
            </div>
            <div>
              <label htmlFor='nickname'>Nickname *</label>
              <span className={styles.alertMessage}>
                {alertMessage.nickname}
              </span>
              <span className={styles.passMessage}>{passMessage.nickname}</span>
              <div>
                <input
                  className={
                    inputValue.id
                      ? `${styles.input}  ${styles.filled}`
                      : styles.input
                  }
                  type='text'
                  id='nickname'
                  name='nickname'
                  value={inputValue.nickname}
                  onChange={handleInputValue}
                />
                <button onClick={dupNicknameToggle}>중복 확인</button>
              </div>
              {/* <input
                className={
                  inputValue.nickname
                    ? `${styles.input}  ${styles.filled}`
                    : styles.input
                }
                type='text'
                id='nickname'
                name='nickname'
                value={inputValue.nickname}
                onChange={handleInputValue}
              /> */}
            </div>
            <div>
              <label htmlFor='emailId'>E-mail *</label>
              <span className={styles.alertMessage}>{alertMessage.email}</span>
              <span className={styles.passMessage}>{passMessage.email}</span>
              <div>
                <input
                  className={
                    inputValue.emailId
                      ? `${styles.input}  ${styles.filled}`
                      : styles.input
                  }
                  type='text'
                  id='emailId'
                  name='emailId'
                  value={inputValue.emailId}
                  onChange={handleInputValue}
                />
                <span className={styles.at}>@</span>
                <input
                  className={
                    inputValue.emailAdress
                      ? `${styles.input}  ${styles.filled}`
                      : styles.input
                  }
                  type='text'
                  name='emailAdress'
                  value={inputValue.emailAdress}
                  onChange={handleInputValue}
                />
              </div>
            </div>
            <div>
              <label htmlFor='profileImage'>Profile Image </label>
              <input
                className={
                  inputValue.profileImage
                    ? `${styles.input}  ${styles.filled}`
                    : styles.input
                }
                type='file'
                id='profileImage'
                name='profileImage'
                value={inputValue.profileImage}
                onChange={handleInputValue}
              />
            </div>
          </div>
          <div className={styles.agreeBox}>
            <input
              type='checkBox'
              id='agree'
              name='agree'
              onChange={handleInputValue}
            />
            <label htmlFor='agree'>개인정보 수집 및 이용에 대한 동의 *</label>
            <span className={styles.alertMessage}>{alertMessage.agree}</span>
            <span className={styles.passMessage}>{passMessage.agree}</span>
          </div>
          <button
            className={submitRequirements ? styles.allFilled : styles.submitBtn}
          >
            Create on account
          </button>
          <p className={styles.link}>
            Already have an account? <Link to='/users/login'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
