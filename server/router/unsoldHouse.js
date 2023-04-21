const express = require("express");
const router = express.Router();
const axios = require("axios");

const KOSIS_KEY = process.env.KOSIS_KEY;
// router.use()

router.get("/", (req, res) => {
  axios
    .get(
      `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${KOSIS_KEY}&itmId=13103792722T1+&objL1=13102792722A.0002+&objL2=13102792722B.0001+&objL3=13102792722C.0001+&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=M&startPrdDe=200701&endPrdDe=202302&orgId=116&tblId=DT_MLTM_2080`
    )
    .then((response) => {
      const data = response.data.map((item) => {
        const year = item.PRD_DE.slice(0, 4);
        const month = item.PRD_DE.slice(4, 6);
        return [Date.UTC(year, month, 1), parseInt(item.DT)];
      });

      res.status(200).send({ data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;
