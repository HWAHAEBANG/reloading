const express = require("express");
const router = express.Router();
const axios = require("axios");
const PIR_KEY = process.env.PIR_KEY;

router.get("/", (req, res) => {
  axios
    .get(
      `https://houstat.hf.go.kr/research/openapi/SttsApiTblData.do?STATBL_ID=T188183126881844&DTACYCLE_CD=MM&ITM_DATANO=10001&START_DTA_DT=201001&END_DTA_DT=203001&TYPE=json&pIndex=1&pSize=1000&key=${PIR_KEY}&CLS_DATANO=50002`
    )
    .then((response) => {
      const categories = response.data.SttsApiTblData[1].row.map(
        (item) => item.WRTTIME_IDTFR_ID
      );

      const data = response.data.SttsApiTblData[1].row.map(
        (item) => item.DTA_VAL
      );

      res.status(200).send({ categories: categories, data: data });
    })
    .catch((error) => res.status(500).send(error.message));
});

module.exports = router;
