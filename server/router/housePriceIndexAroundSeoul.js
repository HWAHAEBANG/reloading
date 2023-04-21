const express = require("express");
const router = express.Router();
const axios = require("axios");

const KOSIS_KEY = process.env.KOSIS_KEY;
// router.use()

router.get("/", (req, res) => {
  axios
    .get(
      `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${KOSIS_KEY}&itmId=sales+&objL1=01+&objL2=a1+&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=M&startPrdDe=200311&endPrdDe=202302&orgId=408&tblId=DT_40803_N0001`
    )
    .then((response) => {
      const data = response.data.map((item) => {
        const year = item.PRD_DE.slice(0, 4);
        const month = item.PRD_DE.slice(4, 6);
        const fixedData = parseFloat(item.DT).toFixed(1);
        return [Date.UTC(year, month, 1), parseFloat(fixedData)];
      });

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
