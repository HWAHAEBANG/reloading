// 새롭게 추가된 데이터는 매일 새벽마다 감지하여 업데이트 되지만, 과거의 데이터가 바뀌는 경우도 간혹 있기에
// 일정 주기로 테이블을 리셋하고 새로운 데이터로 채우는 스케줄러를 실행함.

// 본 스케줄러는 최신데이터 뿐 아니라 과거의 데이터들도 수시로 바뀌는 데이터를 (일단 확인된 것 : 매매거래량, 전세거래량)
// 하루 한번 씩 테이블들을 리셋하고 API로부터 새로운 데이터들로 받아와 모두 다시 저장함.
// 기존의 새로운 값 감지 로직은 알림서비스를 위해 그대로 유지하며,
// 그 로직과 별개로 여기에 있는 데이터들은 리셋작업을 한번 더 수행해 줌.

const schedule = require("node-schedule");
const axios = require("axios");
const https = require("https");
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();

const dailyDataResetScheduler = () => {
  // 새벽 세시 진행

  const agent = new https.Agent({ rejectUnauthorized: false }); // SSL 인증서 오류 무시

  const rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
  rule.hour = 21;
  rule.minute = 44;

  const jobResetTransactionVolumeSalesAptSeoul = schedule.scheduleJob(
    rule,
    () => {
      console.log(
        "서울 아파트 매매 거래량 : 데일리 리셋&패치 작업이 실행되었습니다."
      );

      try {
        axios
          .post(
            "https://land.seoul.go.kr:444/land/rtms/getRtmsSggStatsList.do",
            "&bldgGbn=AP&rightGbnGrp=RTMS&fromYm=200601&toYm=203012",
            {
              headers: {
                Host: "land.seoul.go.kr:444",
                "Content-Length": "54",
                Accept: "application/json, text/javascript, */*; q=0.01",
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
                "Accept-Encoding": "gzip, deflate",
                Connection: "close",
              },
              httpsAgent: agent,
            }
          )
          .then((response) => {
            const filteredData = response.data.result.filter(
              (item) => item.gubunNm === "서울특별시" && item.val !== 0
            );
            // console.log(filteredData);

            for (const item of filteredData) {
              const originDate = item.baseMm;
              const year = item.baseMm.slice(0, 4);
              const month = item.baseMm.slice(4, 6);
              const day = 1;
              const value = item.val;
              console.log("검문소", value);
              const sqlQuery =
                "INSERT INTO transaction_volume_sales_apt_seoul(origin_date,year,month,day,value) VALUES(?,?,?,?,?);";
              db.query(sqlQuery, [originDate, year, month, day, value]);
              console.log("DB저장 성공");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("axios 에러", error);
      }
      jobResetTransactionVolumeSalesAptSeoul.cancel();
    }
  );

  // const jobResetTransactionVolumeJeonseAptSeoul = schedule.scheduleJob(
  //   rule,
  //   () => {
  //     console.log(
  //       "서울 아파트 전세 거래량 : 데일리 리셋&패치 작업이 실행되었습니다."
  //     );

  //     try {
  //       axios
  //         .post(
  //           "https://land.seoul.go.kr:444/land/rent/getRentSggStatsList.do",
  //           "&bldgGbn=AP&rentCd=1&rentGbn=3&fromYm=201001&toYm=203012",
  //           {
  //             headers: {
  //               Host: "land.seoul.go.kr:444",
  //               "Content-Length": "56",
  //               Accept: "application/json, text/javascript, */*; q=0.01",
  //               "Content-Type":
  //                 "application/x-www-form-urlencoded; charset=UTF-8",
  //               "User-Agent":
  //                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  //               "Accept-Encoding": "gzip, deflate",
  //               Connection: "close",
  //             },
  //             httpsAgent: agent,
  //           }
  //         )
  //         .then((response) => {
  //           const filteredData = response.data.result.filter(
  //             (item) => item.gubunNm === "서울특별시"
  //           );
  //           console.log(filteredData);

  //           for (const item of filteredData) {
  //             const originDate = item.baseMm;
  //             const year = item.baseMm.slice(0, 4);
  //             const month = item.baseMm.slice(4, 6);
  //             const day = 1;
  //             const value = item.val;
  //             console.log("검문소", value);
  //             const sqlQuery =
  //               "INSERT INTO transaction_volume_jeonse_apt_seoul(origin_date,year,month,day,value) VALUES(?,?,?,?,?);";
  //             db.query(sqlQuery, [originDate, year, month, day, value]);
  //             console.log("DB저장 성공");
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } catch (error) {
  //       console.log("axios 에러", error);
  //     }
  //     jobResetTransactionVolumeJeonseAptSeoul();
  //   }
  // );
};

// dailyDataResetScheduler();

module.exports = dailyDataResetScheduler;
