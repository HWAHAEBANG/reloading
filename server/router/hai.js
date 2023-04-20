const express = require("express");
const router = express.Router();
const axios = require("axios");

const HAI_KEY = process.env.HAI_KEY;
// router.use()

router.get("/", (req, res) => {
  axios
    .get(
      `https://houstat.hf.go.kr/research/openapi/SttsApiTblData.do?STATBL_ID=T186503126543136&DTACYCLE_CD=QY&ITM_DATANO=10002&START_DTA_DT=200401&END_DTA_DT=203004&TYPE=json&pIndex=1&pSize=1000&key=${HAI_KEY}`
    )
    .then((response) => {
      const categories = response.data.SttsApiTblData[1].row.map(
        (item) =>
          `${item.WRTTIME_IDTFR_ID.slice(0, 4)}년 ${
            item.WRTTIME_IDTFR_ID[5]
          }분기`
      );

      const data = response.data.SttsApiTblData[1].row.map(
        (item) => item.DTA_VAL
      );
      res.status(200).send({ categories: categories, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;
