const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");

const ECOS_KEY = process.env.ECOS_KEY;
// router.use()

const agent = new https.Agent({ rejectUnauthorized: false }); // SSL 인증서 오류 무시

router.get("/", (req, res) => {
  axios
    .post(
      "https://land.seoul.go.kr:444/land/rent/getRentSggStatsList.do",
      "&bldgGbn=AP&rentCd=1&rentGbn=3&fromYm=201001&toYm=202305",
      // "https://land.seoul.go.kr:444/land/rtms/getRtmsSggStatsList.do",
      // "&bldgGbn=AP&rightGbnGrp=RTMS&fromYm=200601&toYm=202305",
      {
        headers: {
          Host: "land.seoul.go.kr:444",
          "Content-Length": "56",
          // "Sec-Ch-Ua":
          //   '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          // "X-Requested-With": "XMLHttpRequest",
          // "Sec-Ch-Ua-Mobile": "?0",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
          // "Sec-Ch-Ua-Platform": '"Windows"',
          // Origin: "https://land.seoul.go.kr:444",
          // "Sec-Fetch-Site": "same-origin",
          // "Sec-Fetch-Mode": "cors",
          // "Sec-Fetch-Dest": "empty",
          // Referer: "https://land.seoul.go.kr:444/land/rtms/rtmsStatistics.do",
          "Accept-Encoding": "gzip, deflate",
          // "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          Connection: "close",
          //   Cookie:
          //     "JSESSIONID=rjxFJVRwhG9gcXdDhHq5Z5SAcUBDX8MXIIZAG8yn9aCKWDkwxmI7phmyM178CY7D.amV1c19kb21haW4vbGFuZGluZm9fMg==; WL_PCID=16852738065658586385576",
        },
        httpsAgent: agent,
      }
    )
    .then((response) => {
      const filteredData = response.data.result.filter(
        (item) => item.gubunNm === "서울특별시"
      );
      // console.log("테스트", filteredData);

      // console.log(data);
      // console.log(categories);
      // console.log(categories);

      // console.log("확인점", categories);
      const data = filteredData.map((item) => {
        const year = item.baseMm.slice(0, 4);
        const month = item.baseMm.slice(4, 6) - 1;
        const fixedData = parseFloat(item.val).toFixed(0);
        return [Date.UTC(year, month, 1), parseFloat(fixedData)];
      });

      res.status(200).send({ data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;
