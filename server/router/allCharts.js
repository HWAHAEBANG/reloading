const express = require("express");
const router = express.Router();

// DB 연결부 ===================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//=============================================

router.get("/", (req, res) => {
  const sqlQuery = `SELECT * FROM charts;`;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
