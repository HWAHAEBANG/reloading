const express = require("express");
const router = express.Router();
const axios = require("axios");

const KOSIS_KEY = process.env.KOSIS_KEY;

router.get("/", (req, res) => {
  axios
    .get(
      `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${KOSIS_KEY}&itmId=T001+&objL1=a7+&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=D&startPrdDe=20210705&endPrdDe=20230410&orgId=408&tblId=DT_304004_WEEK_001`
    )
    .then((response) => {
      const data = response.data.map((item) => {
        const year = item.PRD_DE.slice(0, 4);
        const month = item.PRD_DE.slice(4, 6);
        const day = item.PRD_DE.slice(6);
        const fixedData = parseFloat(item.DT).toFixed(4);
        return [Date.UTC(year, month, day), parseFloat(fixedData)];
      });

      // console.log(categories);
      // console.log(categories);

      // console.log("확인점", categories);
      // const data = response.data.SttsApiTblData[1].row.map(
      //   (item) => item.DTA_VAL
      // );
      res.status(200).send({ data: data });

      // res.status(200).send({ categories: categories, data: data });
    })
    .catch((error) => res.status(500).send(error.message));
});

module.exports = router;
