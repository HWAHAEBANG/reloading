const express = require("express");
const router = express.Router();

// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//=============================================

// router.get("/", (req, res) => {
//   const sqlQuery = `SELECT * FROM charts;`;
//   db.query(sqlQuery, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });

//============================================
router.get("/", (req, res) => {
  const { userId } = req.query; // 클라이언트로부터 현재 로그인 중인 회원의 ID 받아옴
  const sqlQuery = `
    SELECT charts.*,
    CASE WHEN favorites.chart_id IS NOT NULL THEN 1 ELSE 0 END AS isFavorite
    FROM charts
    LEFT JOIN favorites ON charts.id = favorites.chart_id AND favorites.user_id = ?
  `;
  db.query(sqlQuery, [userId], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
