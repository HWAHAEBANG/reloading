const schedule = require("node-schedule");
const axios = require("axios");
const updateRule = require("./updateRule.js");
// DB 연결부 ================================================================================
const connectDB = require("../../config/connectDB.js");
const db = connectDB.init();
// =========================================================================================

const ECOS_KEY = process.env.ECOS_KEY;

const jobUpdateBaseRateKorea = schedule.scheduleJob(updateRule, function () {
  console.log("현재시간 02시 00분 한국 기준금리 데이터 최신화를 진행합니다.");
  try {
    // DB의 가장 최신 데이터의 날짜와 값 가져오기
    const checkSqlQuery =
      "SELECT origin_date,value FROM base_rate_korea WHERE no = (SELECT MAX(no) FROM base_rate_korea);";
    db.query(checkSqlQuery, async (err, result) => {
      if (err) console.log("DB 정보를 불러올 수 없음", err);

      // 비교하기 편하게 객체 형태로 파싱
      const latestDataDb = {
        date: result[0].origin_date,
        value: result[0].value,
      };

      // api에서 데이터 받아옴
      axios
        .get(
          `https://ecos.bok.or.kr/api/StatisticSearch/${ECOS_KEY}/json/kr/1/1000/722Y001/M/200312/203012/0101000`
        )
        .then((response) => {
          const filteredData = response.data.StatisticSearch.row.map(
            (item) => ({
              date: item.TIME,
              value: parseFloat(item.DATA_VALUE), // 이 api는 값은 문자열 형태로 줘서 그냥 할당할 시 버그가 발생한다.
            })
          );

          // 그중에서 가장 최신 값 가져오기
          const latestDataApi = filteredData[filteredData.length - 1];

          // console.log("디비", latestDataDb);
          // console.log("디비 날짜", latestDataDb.date);
          // console.log("디비 벨류", latestDataDb.value);
          // console.log("디비 벨류 타입", typeof latestDataDb.value);

          // console.log("에피아이", latestDataApi);
          // console.log("에피아이 날짜", latestDataApi.date);
          // console.log("에피아이 벨류", latestDataApi.value);
          // console.log("에피아이 벨류 타입", typeof latestDataApi.value);

          // 날짜가 일치하면 값까지 같은지 확인한다음 같으면 통과, 다르면 update문 실행.
          // value까지 비교하는 이유는 몇몇 api에서 가장 최신 값의 변경되는 경우가 있기 때문.
          if (latestDataApi.date === latestDataDb.date) {
            if (latestDataApi.value === latestDataDb.value) {
              console.log("한국 기준금리 : 현재 DB는 최신 상태 입니다. ");
            } else {
              const updateSqlQuery = `UPDATE base_rate_korea SET value = ? WHERE origin_date = ?`;
              db.query(
                updateSqlQuery,
                [latestDataApi.value, latestDataApi.date],
                (err, result) => {
                  if (err) return console.log(err);
                  //=====================================================================
                  const message = "한국 기준금리 : 최근 일자 데이터 변동";
                  const notificationQuery = `INSERT INTO data_update_logs (message,update_type) VALUES (?,?);`;
                  db.query(
                    notificationQuery,
                    [message, "modify"],
                    (err, result) => {
                      if (err)
                        return console.log(
                          "업데이트 공지 테이블에 추가하지 못했습니다."
                        );
                      console.log(
                        "한국 기준금리 : 데이터에 변경사항이 감지되어 DB를 수정하였습니다."
                      );
                    }
                  );
                  //=====================================================================
                }
              );
            }
          } else {
            // 날짜가 일치하지 않으면 새로운 데이터가 생선된 것이므로 insertans 실행
            const year = latestDataApi.date.slice(0, 4);
            const month = latestDataApi.date.slice(4, 6);
            const day = 1;
            const insertSqlQuery =
              "INSERT INTO base_rate_korea(origin_date,year,month,day,value) VALUES(?,?,?,?,?);";
            db.query(
              insertSqlQuery,
              [latestDataApi.date, year, month, day, latestDataApi.value],
              (err, result) => {
                if (err) return console.log(err);
                //========================================================================
                const message = "한국 기준금리 : 최신 데이터 추가";
                const notificationQuery = `INSERT INTO data_update_logs (message,update_type) VALUES (?,?);`;
                db.query(notificationQuery, [message, "add"], (err, result) => {
                  if (err)
                    return console.log(
                      "업데이트 공지 테이블에 추가하지 못했습니다."
                    );
                  console.log(
                    "한국 기준금리 : 새로운 데이터가 감지되어 DB에 추가하였습니다."
                  );
                });
                //========================================================================
              }
            );
          }
        });
    });
  } catch (error) {
    console.log("axios 에러", error);
  }
});

module.exports = jobUpdateBaseRateKorea;
