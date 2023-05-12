const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//=============================================

router.get("/test", (req, res) => {
  const sqlQuery = `SELECT title FROM test;`;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//==============================================
//아이디 확인 ===================================
router.post("/idCheck", (req, res) => {
  const inputId = req.body.data.inputId;
  const sqlQuery = `SELECT id FROM users WHERE id = ?;`;
  db.query(sqlQuery, [inputId], (err, result) => {
    if (err) res.status(500).json(err);
    if (result[0].length === 0) {
      res.status(403).json("Not Exist ID");
    } else {
      res.send(result);
    }
  });
});
//==============================================
//비밀번호 확인 =================================
router.post("/pwCheck", (req, res) => {
  const inputId = req.body.data.inputId;
  const inputPw = req.body.data.inputPw;
  const sqlQuery = `SELECT * FROM users WHERE id = ? AND pw = ?;`;
  db.query(sqlQuery, [inputId, inputPw], (err, result) => {
    if (err) res.status(500).json(err);
    if (result[0].length === 0) {
      res.status(403).json("Wrong Password");
    } else {
      // access Token 발급
      //세가지의 인수를 받음 (1. 어떤 user 정보를 담을지, 2.시크릿값, 3.유효기간 및 발행자)
      const accessToken = jwt.sign(
        {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1m", // 유효기간 30분
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
        console.log("리프레시토큰 디비저장 완료", result);
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
    }
  });
});

// 클라이언트에서 로그인 안되어있을 때 쿠키 보고 요청 안하도록 리팩토링 요망
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

router.get("/refreshtoken", (req, res) => {
  const token = req.cookies.refreshToken;
  const data = jwt.verify(token, process.env.REFRESH_SECRET);
  const sqlQuery = `SELECT * FROM users WHERE id = ?;`;
  db.query(sqlQuery, [data.id], (err, result) => {
    if (err) res.status(500).json(err);
    if (result.length === 0) {
      res.status(403).json("Can Not Get Refresh Token");
    } else {
      console.log(result);
      const savedToken = result[0].refresh_token;

      if (savedToken === token) {
        const accessToken = jwt.sign(
          {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "1m", // 유효기간 30분
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
      } else {
        res.status(403).json("Diffrent Refresh Token");
      }
    }
  });
});

// router.get("/success", (req, res) => {
//     // 추후 다른 요청들도 try catch 문으로 리팩토링 요망.
//     try {
//       const token = req.cookies.accessToken;
//       const data = jwt.verify(token, process.env.ACCESS_SECRET);

//       const sqlQuery = `SELECT * FROM users WHERE id = ?;`;
//       db.query(sqlQuery, [data.id], (err, result) => {
//         if (err) res.status(500).json(err);p
//         } else {
//           console.log(result);
//           const { pw, ...others } = result[0];
//           res.status(200).json(others);
//         }
//       });

//     } catch (error) {
//       res.status(500).json(error);
//     }
// });

router.post("/logout", (req, res) => {
  // 추후 다른 요청들도 try catch 문으로 리팩토링 요망.
  try {
    const presentId = req.body.data.presentId;
    const sqlQuery = `UPDATE users SET refresh_token = null WHERE id = ?;`;
    db.query(sqlQuery, [presentId], (err, result) => {
      if (err) res.status(500).json(err);
      res.status(200).json("Access Token Is Deleted");
    });

    res.cookie("accessToken", "", {
      // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
      // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
      httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
      // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
    });

    res.status(200).json("Logout Seuccess");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
