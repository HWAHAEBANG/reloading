const schedule = require("node-schedule");
const axios = require("axios");

// DB 연결부 ================================================================================
const connectDB = require("../config/connectDB.js");
// const { route } = require("./allCharts.js");
const db = connectDB.init();
connectDB.open(db);
// ===========================================================================================

// 예약된 작업 실행

const test = () => {
  const rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
  rule.hour = 23;
  rule.minute = 52;

  const job = schedule.scheduleJob(rule, async function () {
    console.log("작업이 실행되었습니다.");

    try {
      const response = await axios.get(
        "https://aptgin.com/pre/chart/region?loc=1100000000&target=rchart&type=p&ref=REGION01.MULTI_CHART%2CREGION01.REGION_LIST&locList=1100000000",
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      const checkSqlQuery =
        "SELECT origin_date FROM pir_apt_seoul WHERE no = (SELECT MAX(no) FROM pir_apt_seoul);";
      db.query(checkSqlQuery, (err, result) => {
        if (err) console.log("DB 정보를 불러올 수 없음", err);
        console.log("잘 불러왔네", result[0].origin_date);
      });

      // for (const item of response.data[0]) {
      //   if (item.pir_3part === null) continue; // 맨 첫번째와 미래의 값이 null 이라 오류 발생함.
      //   const originDate = item.yyyymm;
      //   const year = item.yyyymm.slice(0, 4);
      //   const month = item.yyyymm.slice(5, 7);
      //   const day = item.yyyymm.slice(8);
      //   const value = item.pir_3part;
      //   console.log("검문소", value);
      //   const insertSqlQuery =
      //     "INSERT INTO pir_apt_seoul(origin_date,year,month,day,value) VALUES(?,?,?,?,?);";
      //   db.query(insertSqlQuery, [originDate, year, month, day, value]);
      //   console.log("DB저장 성공");
      // }
    } catch (error) {
      console.log("axios 에러", error);
    }

    job.cancel();
  });
};

// test();

module.exports = test;

// 이하 최초 데이터 추가시 사용할 로직?
// const schedule = require("node-schedule");
// const axios = require("axios");

// // DB 연결부 ================================================================================
// const connectDB = require("../config/connectDB.js");
// // const { route } = require("./allCharts.js");
// const db = connectDB.init();
// connectDB.open(db);
// // ===========================================================================================

// // 예약된 작업 실행

// const test = () => {
//   const rule = new schedule.RecurrenceRule();
//   // rule.dayOfWeek = [1]; // 0:일 1:월 2:화 3:수 4:목 5:금  6:토
//   rule.hour = 23;
//   rule.minute = 29;

//   const job = schedule.scheduleJob(rule, async function () {
//     console.log("작업이 실행되었습니다.");

//     try {
//       const response = await axios.get(
//         "https://aptgin.com/pre/chart/region?loc=1100000000&target=rchart&type=p&ref=REGION01.MULTI_CHART%2CREGION01.REGION_LIST&locList=1100000000",
//         {
//           headers: {
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         }
//       );
//       for (const item of response.data[0]) {
//         if (item.pir_3part === null) continue; // 맨 첫번째와 미래의 값이 null 이라 오류 발생함.
//         const originDate = item.yyyymm;
//         const year = item.yyyymm.slice(0, 4);
//         const month = item.yyyymm.slice(5, 7);
//         const day = item.yyyymm.slice(8);
//         const value = item.pir_3part;
//         console.log("검문소", value);
//         const sqlQuery =
//           "INSERT INTO pir_apt_seoul(origin_date,year,month,day,value) VALUES(?,?,?,?,?);";
//         db.query(sqlQuery, [originDate, year, month, day, value]);
//         console.log("DB저장 성공");
//       }
//     } catch (error) {
//       console.log("axios 에러", error);
//     }

//     job.cancel();
//   });
// };

// // test();

// module.exports = test;
