import React, { useEffect, useState, Suspense, lazy } from "react";
import styles from "./ChartDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoInformationCircleSharp, IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";

const Pir = lazy(() => import("../../graph/Pir"));
const Hai = lazy(() => import("../../graph/Hai"));
const UnsoldHouse = lazy(() => import("../../graph/UnsoldHouse"));
const AmountAndPrice = lazy(() => import("../../graph/AmountAndPrice"));
const JeonsePriceRatio = lazy(() => import("../../graph/JeonsePriceRatio"));
const PriceChangeRate = lazy(() => import("../../graph/PriceChangeRate"));
const SpiderWeb = lazy(() => import("../../graph/SpiderWeb"));
const Gauge = lazy(() => import("../../graph/Gauge"));

const componentMapping = {
  pir: Pir,
  hai: Hai,
  unsoldHouse: UnsoldHouse,
  amountAndPrice: AmountAndPrice,
  jeonsePriceRatio: JeonsePriceRatio,
  priceChangeRate: PriceChangeRate,
  spiderWeb: SpiderWeb,
  gauge: Gauge,
};

export default function ChartDetail() {
  // const navigate = useNavigate();

  const backToList = () => {
    window.history.go(-1); // 브라우저의 뒤로가기 동작 수행
    // navigate("/allCharts");
  };

  const [chartsData, setChartsData] = useState();
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlPathName = url.pathname.split("/")[2];
    axios
      .get(
        `http://Reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/api/allCharts/chartDetail`,
        {
          method: "GET",
          withCredentials: true,
          params: {
            // userId: userInfo.userInfo.id, // 클라이언트에서 현재 로그인 중인 회원의 ID 변수를 전달
            urlPathName: urlPathName,
          },
        }
      )
      .then((response) => {
        setChartsData(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Component = chartsData && componentMapping[chartsData.id];

  console.log("임시 검문소", chartsData);

  return (
    <div className={styles.mainContainer}>
      {chartsData ? (
        <div className={styles.subContainer}>
          <IoArrowBackCircle
            className={styles.backToList}
            onClick={backToList}
          />
          <div className={styles.inner}>
            <div className={styles.chartArea}>
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            </div>
            <div className={styles.desciptionArea}>
              <div
                className={
                  chartsData.youtubeUrl
                    ? styles.descriptionSection
                    : `${styles.descriptionSection} ${styles.noYoutube}`
                }
              >
                <div
                  className={
                    chartsData.youtubeUrl
                      ? styles.descriptionBox
                      : `${styles.descriptionBox} ${styles.noYoutubeVer}`
                  }
                >
                  <p className={styles.descriptionTitle}>{chartsData.title}</p>
                  <p
                    className={styles.descriptionContent}
                    dangerouslySetInnerHTML={{
                      __html: chartsData.description,
                    }}
                  ></p>
                </div>
                <div
                  className={
                    chartsData.youtubeUrl
                      ? styles.helperBox
                      : `${styles.helperBox} ${styles.noYoutubeVer}`
                  }
                >
                  <p className={styles.helperTitle}> 차트보는 방법</p>
                  <p
                    className={styles.helperContent}
                    dangerouslySetInnerHTML={{
                      __html: chartsData.helperText,
                    }}
                  ></p>
                </div>
                <p>{IoInformationCircleSharp}</p>
              </div>
              {chartsData.youtubeUrl ? (
                <div className={styles.youtubeSection}>
                  {chartsData.youtubeUrl ? (
                    <iframe
                      id='player'
                      type='text/html'
                      width='100%'
                      height='100%'
                      src={`https://www.youtube.com/embed/${chartsData.youtubeUrl}?start=${chartsData.startSecond}`}
                      frameBorder='0'
                      title={chartsData.title}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.sourceArea}>
            <IoInformationCircleSharp className={styles.sourceIcon} />
            <div className={styles.sourceBox}>
              <p>데이터별 출처 & 업데이트 일자</p>
              {chartsData &&
                JSON.parse(chartsData.dataSources).map((dataSourse, index) => (
                  <p key={index}>{dataSourse}</p>
                ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
