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
      // const categories = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.WRTTIME_IDTFR_ID
      // );

      // const data = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.DTA_VAL
      // );

      const data = response.data.SttsApiTblData[1].row.map((item) => {
        const year = item.WRTTIME_IDTFR_ID.slice(0, 4);
        const month = item.WRTTIME_IDTFR_ID.slice(4, 6);
        const fixedData = parseFloat(item.DTA_VAL).toFixed(1);
        return [Date.UTC(year, month, 1), parseFloat(fixedData)];
      });

      res.status(200).send({ data: data });
    })
    .catch((error) => res.status(500).send(error.message));
});

module.exports = router;
