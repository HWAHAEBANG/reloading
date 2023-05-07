const express = require("express");
const router = express.Router();

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

module.exports = router;
