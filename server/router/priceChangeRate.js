const express = require("express");
const router = express.Router();
const axios = require("axios");

const KOSIS_KEY = process.env.KOSIS_KEY;

router.get("/", (req, res) => {
  const url =
    "https://data-api.kbland.kr/bfmstat/weekMnthlyHuseTrnd/prcIndxInxrdcRt?%EA%B8%B0%EA%B0%84=&%EB%A7%A4%EB%A7%A4%EC%A0%84%EC%84%B8%EC%BD%94%EB%93%9C=01&%EB%A7%A4%EB%AC%BC%EC%A2%85%EB%B3%84%EA%B5%AC%EB%B6%84=01&%EC%9B%94%EA%B0%84%EC%A3%BC%EA%B0%84%EA%B5%AC%EB%B6%84%EC%BD%94%EB%93%9C=02&%EC%A7%80%EC%97%AD%EC%BD%94%EB%93%9C=&type=false&excelApi=true";

  axios
    .get(url)
    .then((response) => {
      console.log("어디부터", response.data.dataBody.data);
      console.log("어디부터", response.data.dataBody.data.업데이트일자);
      console.log("어디부터", response.data.dataBody.data.데이터리스트);
      console.log("어디부터", response.data.dataBody.data.날짜리스트);
      // const data = response.data.map((item) => {
      //   const year = item.PRD_DE.slice(0, 4);
      //   const month = item.PRD_DE.slice(4, 6);
      //   const day = item.PRD_DE.slice(6);
      //   const fixedData = parseFloat(item.DT).toFixed(4);
      //   return [Date.UTC(year, month, day), parseFloat(fixedData)];
      // });

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

// router.get("/", (req, res) => {
//   axios
//     .get(
//       `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${KOSIS_KEY}&itmId=T001+&objL1=a7+&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=D&startPrdDe=20080407&endPrdDe=20230410&orgId=408&tblId=DT_304004_WEEK_001`
//     )
//     .then((response) => {
//       const data = response.data.map((item) => {
//         const year = item.PRD_DE.slice(0, 4);
//         const month = item.PRD_DE.slice(4, 6);
//         const day = item.PRD_DE.slice(6);
//         const fixedData = parseFloat(item.DT).toFixed(4);
//         return [Date.UTC(year, month, day), parseFloat(fixedData)];
//       });

//       // console.log(categories);
//       console.log(data);
//       // console.log(categories);

//       // console.log("확인점", categories);
//       // const data = response.data.SttsApiTblData[1].row.map(
//       //   (item) => item.DTA_VAL
//       // );
//       res.status(200).send({ data: data });

//       // res.status(200).send({ categories: categories, data: data });
//     })
//     .catch((error) => res.status(500).send(error.message));
// });
