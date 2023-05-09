const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
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
// 빌드 폴더 안에 있는 코드들을 서버에서 마음대로 꺼내가도 된다.
// 서버가 허용되지 않은 파일을 가져가려고하면 굉장한 보안이슈가 있을 수 있기 때문에 이 같이 하는 것.
// 서버를 켜놨다는 이유로 내 PC에 있는 모든 파일을 막 접속을 하거나 한다면 굉장히 위험하므로.
app.use(express.static("build"));
// 루트 경로로 들어왔을 때 다음 파일을 보낸다.
app.get("/", (req, res) => {
  res.sendFile(__dirname, "/build/index.html");
  // 해당하는 파일 경로를 정어운다,  __dirname는 루트경로를 의미/
});

// page ===================================

const ALL_CHARTS = require("./router/allCharts.js");
app.use("/allCharts", ALL_CHARTS);

// const My_CHARTS = require("./router/myCharts.js");
// app.use("/myCharts", My_CHARTS);

const USERS = require("./router/users.js");
app.use("/users", USERS);

const TOPIC_NEWS = require("./router/topicNews.js");
app.use("/topicNews", TOPIC_NEWS);

// chart ==================================
const HAI = require("./router/hai.js");
app.use("/allCharts/hai", HAI);

const PIR = require("./router/pir.js");
app.use("/allCharts/pir", PIR);

const UNSOLDHOUSE = require("./router/unsoldHouse.js");
app.use("/allCharts/unsoldHouse", UNSOLDHOUSE);

const HOUSE_PRICE_INDEX_SEOUL = require("./router/housePriceIndexSeoul.js");
app.use("/allCharts/housePriceIndexSeoul", HOUSE_PRICE_INDEX_SEOUL);

const JEONSE_PRICE_INDEX_SEOUL = require("./router/JeonsePriceIndexSeoul.js"); // 파일명수정 필요
app.use("/allCharts/JeonsePriceIndexSeoul", JEONSE_PRICE_INDEX_SEOUL);

const HOUSE_PRICE_INDEX_AROUND_SEOUL = require("./router/housePriceIndexAroundSeoul.js");
app.use(
  "/allCharts/housePriceIndexAroundSeoul",
  HOUSE_PRICE_INDEX_AROUND_SEOUL
);

const JEONSE_PRICE_INDEX_AROUND_SEOUL = require("./router/JeonsePriceIndexAroundSeoul.js");
app.use(
  "/allCharts/JeonsePriceIndexAroundSeoul",
  JEONSE_PRICE_INDEX_AROUND_SEOUL
);

const JEONSE_PRICE_RATIO = require("./router/jeonsePriceRatio.js");
app.use("/allCharts/jeonsePriceRatio", JEONSE_PRICE_RATIO);

const PRICE_CHANGE_RATE = require("./router/priceChangeRate.js");
app.use("/allCharts/priceChangeRate", PRICE_CHANGE_RATE);

// ========================================

app.listen(PORT, () => {
  console.log(`${PORT}번 포트가 열렸다..!`);
});
