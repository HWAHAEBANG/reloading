const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

//==========================================

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // 왜필요?
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * body-parser 미들웨어는 HTTP 요청의 본문을 파싱하여 JSON 객체나 URL-encoded 문자열 등의 형태로 변환해주는 역할을 합니다. 이렇게 변환된 데이터는 req.body 객체에 저장되어 다른 라우팅 핸들러에서 사용될 수 있습니다.
 * extended: true 옵션은 내장된 QS(Query String) 모듈을 사용하여 URL-encoded 문자열을 해석할 때, 객체 안에 중첩된 객체 형태를 허용할지 여부를 설정합니다. true로 설정하면 중첩된 객체를 허용하며, false로 설정하면 중첩된 객체를 허용하지 않습니다.
 */

// =========================================

const HAI = require("./router/hai.js");
app.use("/hai", HAI);

const PIR = require("./router/pir.js");
app.use("/pir", PIR);

const UNSOLDHOUSE = require("./router/unsoldHouse.js");
app.use("/unsoldHouse", UNSOLDHOUSE);

const USERS = require("./router/users.js");
app.use("/users", USERS);

// ========================================

app.listen(PORT, () => {
  console.log(`${PORT}번 포트가 열렸다..!`);
});
