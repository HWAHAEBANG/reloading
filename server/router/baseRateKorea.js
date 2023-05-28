const express = require("express");
const router = express.Router();
const axios = require("axios");

const ECOS_KEY = process.env.ECOS_KEY;
// router.use()

router.get("/", (req, res) => {
  axios
    .get(
      `https://ecos.bok.or.kr/api/StatisticSearch/${ECOS_KEY}/json/kr/1/1000/722Y001/M/200312/203012/0101000`
    )
    .then((response) => {
      const data = response.data.StatisticSearch.row.map((item) => {
        const year = item.TIME.slice(0, 4);
        const month = item.TIME.slice(4, 6);
        const fixedData = parseFloat(item.DATA_VALUE).toFixed(2);
        return [Date.UTC(year, month, 1), parseFloat(fixedData)];
      });

      // console.log("시발", response.data.StatisticSearch.row);

      // console.log(data);
      // console.log(categories);
      // console.log(categories);

      // console.log("확인점", categories);
      // const data = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.DTA_VAL
      // );
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;
