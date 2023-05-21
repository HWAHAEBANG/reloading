const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 또 써줘야하는건가? 추후 확인 ====================
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

router.use(express.json()); // 왜필요? json 형식의 데이터를 통신하기 위해서.
router.use(cookieParser());
router.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // 사용할 메서드
    credentials: true, // 사용자와 클라이언트 서버간에 쿠키를 사용해서 통신을 할 것이기 떄문에.
  })
);
router.use(bodyParser.urlencoded({ extended: true }));

//=============================================
// 인증 미들웨어 ===============================
const authMiddleware = require("../middlewares/authMiddleware.js");

// crypto 관련 =================================
// 비밀번호를 해시화 하는 함수
function hashPassword(pwd) {
  // salt생성
  const salt = crypto.randomBytes(16);
  // 해시 함수 생성 (pbkdf2Syncg는 해시화 알고리즘)
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, "sha512");
  return { salt, hash };
}
// 비밀번호 확인 함수
function verifyPassword(pwd, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(pwd, salt, 1000, 64, "sha512");
  return hash.toString("hex") === hashVerify.toString("hex");
}
// =============================================

// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);

//==============================================
//아이디 확인 ===================================
router.post("/idCheck", (req, res) => {
  const inputId = req.body.data.inputId;
  const sqlQuery = `SELECT id FROM users WHERE id = ?;`;
  db.query(sqlQuery, [inputId], (err, result) => {
    if (err) res.status(500).json(err);
    if (result.length === 0) {
      res.status(403).json("Not Exist ID");
    } else {
      res.send(result);
    }
    // console.log(result);
  });
});
//==============================================
//닉네임 확인 ===================================
router.post("/nicknameCheck", (req, res) => {
  const inputNickname = req.body.data.inputNickname;
  const sqlQuery = `SELECT id FROM users WHERE nickname = ?;`;
  db.query(sqlQuery, [inputNickname], (err, result) => {
    if (err) res.status(500).json(err);
    if (result.length === 0) {
      res.status(403).json("Not Exist Nickname");
    } else {
      res.send(result);
    }
    // console.log(result);
  });
});
//==============================================
//비밀번호 확인 =================================
router.post("/pwCheck", (req, res) => {
  const inputId = req.body.data.inputId;
  const inputPw = req.body.data.inputPw;
  const sqlQuery = `SELECT * FROM users WHERE id = ?;`; // 그거 버그 잡아야함.
  db.query(sqlQuery, [inputId], (err, result) => {
    if (err) res.status(500).json(err);
    // 해쉬값 비교
    const isAuthenticated = verifyPassword(
      inputPw,
      result[0].hash,
      result[0].salt
    );

    // access Token 발급
    //세가지의 인수를 받음 (1. 어떤 user 정보를 담을지, 2.시크릿값, 3.유효기간 및 발행자)
    if (isAuthenticated) {
      const accessToken = jwt.sign(
        {
          id: result[0].id,
          name: result[0].name,
          nickname: result[0].nickname,
          email: result[0].email,
          profileImage: result[0].profile_image,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "30m", // 유효기간 30분
          issuer: "HHB", // 발행자
        }
      );

      // refresh Token 발글
      const refreshToken = jwt.sign(
        {
          id: result[0].id,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "336h", // 유효기간 2주
          issuer: "HHB", // 발행자
        }
      );

      // 발급한 refresh Token을 DB에도 저장
      const sqlQuery = `UPDATE users SET refresh_token = ? WHERE id = ?;`;
      db.query(sqlQuery, [refreshToken, result[0].id], (err, result) => {
        if (err) res.status(500).json(err);
      });

      // token 전송 (쿠키를 통해)
      res.cookie("accessToken", accessToken, {
        // domain:
        // "http://localhost:5000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
        // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
        httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
        // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
      });

      res.cookie("refreshToken", refreshToken, {
        // domain:
        // "http://localhost:5000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
        // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값, , false 줬더니 쿠키 안옴;
        httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
        // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
      });

      res.status(200).json("Login Success");
    } else {
      res.status(403).json("Wrong Password");
    }
  });
});

router.get("/accesstoken", (req, res) => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET);
  const sqlQuery = `SELECT * FROM users WHERE id = ?;`;
  db.query(sqlQuery, [data.id], (err, result) => {
    if (err) res.status(500).json(err);
    if (result.length === 0) {
      res.status(403).json("Can Not Get Info");
    } else {
      console.log(result);
      const { pw, ...others } = result[0];
      res.status(200).json(others);
    }
  });
});

// 필요없...근거같은데?? 갱신은 자동으로 해주고, 처음에는 로그인에서 받고... 주석처리!
// router.get("/refreshtoken", (req, res) => {
//   const token = req.cookies.refreshToken;
//   const data = jwt.verify(token, process.env.REFRESH_SECRET);
//   const sqlQuery = `SELECT * FROM users WHERE id = ?;`;
//   db.query(sqlQuery, [data.id], (err, result) => {
//     if (err) res.status(500).json(err);
//     if (result.length === 0) {
//       res.status(403).json("Can Not Get Refresh Token");
//     } else {
//       console.log(result);
//       const savedToken = result[0].refresh_token;

//       if (savedToken === token) {
//         const accessToken = jwt.sign(
//           {
//             id: result[0].id,
//             name: result[0].name,
//             email: result[0].email,
//           },
//           process.env.ACCESS_SECRET,
//           {
//             expiresIn: "30m", // 유효기간 30분
//             issuer: "HHB", // 발행자
//           }
//         );

//         // token 전송 (쿠키를 통해)
//         res.cookie("accessToken", accessToken, {
//           // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
//           // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
//           httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
//           // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
//         });

//         res.status(200).json("Access Token Recreated");
//       } else {
//         res.status(403).json("Diffrent Refresh Token");
//       }
//     }
//   });
// });

router.post("/logout", (req, res) => {
  // 추후 다른 요청들도 try catch 문으로 리팩토링 요망.
  try {
    const presentId = req.body.data.presentId;
    const sqlQuery = `UPDATE users SET refresh_token = null WHERE id = ?;`;
    db.query(sqlQuery, [presentId], (err, result) => {
      if (err) res.status(500).json(err);
      res.cookie("accessToken", "", {
        // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
        // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
        httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
        // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
      });
      res.cookie("refreshToken", "", {
        // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
        // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
        httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
        // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
      });
      res.status(200).json("Logout Seuccess");
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/signup", (req, res) => {
  try {
    const { id, pw, name, nickname, emailId, emailAddress, profileImage } =
      req.body.data.inputValue;
    const email = emailId + emailAddress;
    const { salt, hash } = hashPassword(pw);
    const profileImageValue = profileImage ? profileImage : null;
    // console.log(id, pw, name, nickname, emailId, emailAddress, profileImage);
    const sqlQuery =
      "INSERT INTO users(id,salt,hash,name,nickname,email,profile_image) VALUES(?,?,?,?,?,?,?);";
    db.query(
      sqlQuery,
      [id, salt, hash, name, nickname, email, profileImageValue],
      (err, result) => {
        if (err) res.status(500).json(err);
        res.status(200).json("Signup Success");
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/editUserInfo", (req, res) => {
  // 추후 다른 요청들도 try catch 문으로 리팩토링 요망.
  try {
    const { id, pw, name, nickname, emailId, emailAddress, profileImage } =
      req.body.data.inputValue;
    const email = emailId + emailAddress;
    const profileImageValue = profileImage ? profileImage : null;
    if (pw) {
      const { salt, hash } = hashPassword(pw);
      const sqlQuery = `UPDATE users SET salt = ?, hash= ?,  name = ?, nickname = ?, email = ?, profile_image = ? WHERE id = ?;`;
      db.query(
        sqlQuery,
        [salt, hash, name, nickname, email, profileImageValue, id],
        (err, result) => {
          if (err) res.status(500).json(err);

          // access Token 발급
          //세가지의 인수를 받음 (1. 어떤 user 정보를 담을지, 2.시크릿값, 3.유효기간 및 발행자)
          const accessToken = jwt.sign(
            {
              id: id,
              name: name,
              nickname: nickname,
              email: email,
              profileImage: profileImageValue,
            },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "30m", // 유효기간 30분
              issuer: "HHB", // 발행자
            }
          );

          // token 전송 (쿠키를 통해)
          res.cookie("accessToken", accessToken, {
            // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
            // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
            httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
            // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
          });

          res.status(200).json("Access Token Recreated");
        }
      );
    } else {
      const sqlQuery = `UPDATE users SET name = ?, nickname = ?, email = ?, profile_image = ? WHERE id = ?;`;
      db.query(
        sqlQuery,
        [name, nickname, email, profileImageValue, id],
        (err, result) => {
          if (err) res.status(500).json(err);

          // access Token 발급
          //세가지의 인수를 받음 (1. 어떤 user 정보를 담을지, 2.시크릿값, 3.유효기간 및 발행자)
          const accessToken = jwt.sign(
            {
              id: id,
              name: name,
              nickname: nickname,
              email: email,
              profileImage: profileImageValue,
            },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "30m", // 유효기간 30분
              issuer: "HHB", // 발행자
            }
          );

          // token 전송 (쿠키를 통해)
          res.cookie("accessToken", accessToken, {
            // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
            // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
            httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
            // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
          });

          res.status(200).json("Access Token Recreated");
        }
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
