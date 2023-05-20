const jwt = require("jsonwebtoken");

// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//=============================================

const authMiddleware = (req, res, next) => {
  // 쿠키에서 access token 가져오기
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    // access token 검증
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    // 리프레시 로직 =========================
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const sqlQuery = `SELECT * FROM users WHERE id = ?;`;
    db.query(sqlQuery, [data.id], (err, result) => {
      if (err) res.status(500).json(err);
      if (result.length === 0) {
        // 오류 발생구간 간헐적 서버 튕김. 추후 디버깅
        res.status(403).json("Can Not Get Refresh Token");
      } else {
        console.log(result);
        const savedToken = result[0].refresh_token;

        if (savedToken === token) {
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

          // token 전송 (쿠키를 통해)
          res.cookie("accessToken", accessToken, {
            // domain: "http://localhost:3000", //이거 썼더니, 3000도 여전히 안되고, 5000까지 안 돼버림.
            // secure: true, //https와 http 차이를 명시 하는 것 (http면 false), 쿠키가 SSL이나 HTTPS 연결을 통해서만 반횐될지 여부를 명시하는 값 , false 줬더니 쿠키 안옴;
            httpOnly: true, //JS와 http 중에 어디서 접근이 가능할지 지정하는 옵션으로, true를 주면 자바스크립트에서 쿠키의 접근이 불가능해짐!
            // sameSite: "none", // + 쿠키가 같은 도메인에서만 접근할 수 있어야 하는지 여부를 결정하는 값
          });
          console.log("재발급 완료");
          // res.status(200).json("Access Token Recreated"); // 이게 있으면 반환코드가 두개라 되어 오류발생
          next(); // 이게 없으면 권한이 없는 상태에서 라우터함수가 먼저 동작해 데이터를 불러오지 못함.
        } else {
          res.status(403).json("Diffrent Refresh Token");
        }
      }
    });
    // 리프레시 로직 끝=========================
    // return res.status(403).json({ message: "Invalid access token" });
  }
};

module.exports = authMiddleware;
