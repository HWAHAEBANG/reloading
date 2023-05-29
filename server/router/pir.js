const express = require("express");
const router = express.Router();
const axios = require("axios");
const PIR_KEY = process.env.PIR_KEY;

router.get("/", (req, res) => {
  axios
    .get(
      // `https://houstat.hf.go.kr/research/openapi/SttsApiTblData.do?STATBL_ID=T188183126881844&DTACYCLE_CD=MM&ITM_DATANO=10001&START_DTA_DT=201001&END_DTA_DT=203001&TYPE=json&pIndex=1&pSize=1000&key=${PIR_KEY}&CLS_DATANO=50002`
      "https://aptgin.com/pre/chart/region?loc=1100000000&target=rchart&type=p&ref=REGION01.MULTI_CHART%2CREGION01.REGION_LIST&locList=1100000000",
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
    .then((response) => {
      const data = response.data[0].map((item) => {
        if (item.pir_3part === null) return; // 맨 첫번째와 미래의 값이 null 이라 오류 발생함.
        const year = item.yyyymm.slice(0, 4);
        const month = item.yyyymm.slice(5, 7) - 1;
        const day = item.yyyymm.slice(8);
        const fixedData = parseFloat(item.pir_3part.toFixed(2));
        return [Date.UTC(year, month, day), parseFloat(fixedData)];
      });

      console.log("과연 될것인가", data);
      //
      // const categories = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.WRTTIME_IDTFR_ID
      // );

      // const data = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.DTA_VAL
      // );

      // const data = response.data.SttsApiTblData[1].row.map((item) => {
      //   const year = item.WRTTIME_IDTFR_ID.slice(0, 4);
      //   const month = item.WRTTIME_IDTFR_ID.slice(4, 6);
      //   const fixedData = parseFloat(item.DTA_VAL).toFixed(1);
      //   return [Date.UTC(year, month, 1), parseFloat(fixedData)];
      // });

      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send(error.message);
      console.log(error);
    });
});

module.exports = router;
