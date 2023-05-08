import React, { Suspense, lazy } from "react";
import styles from "./ChartDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoInformationCircleSharp, IoArrowBackCircle } from "react-icons/io5";
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
  const navigate = useNavigate();

  const backToList = () => {
    navigate("/allCharts");
  };

  const {
    state: {
      data: {
        id,
        title,
        subTitle,
        description,
        youtubeUrl,
        startSecond,
        helperText,
        dataSources, // 문자열 상태의 배열이다.
      },
    },
  } = useLocation();

  console.log("왜안됨", dataSources);
  console.log("왜안됨", typeof dataSources);

  const Component = componentMapping[id];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.inner}>
          <IoArrowBackCircle
            className={styles.backToList}
            onClick={backToList}
          />
          <div className={styles.sourceArea}>
            <IoInformationCircleSharp className={styles.sourceIcon} />
            <div className={styles.sourceBox}>
              <p>데이터별 출처 & 업데이트 일자</p>
              {JSON.parse(dataSources).map((dataSourse) => (
                <p>{dataSourse && dataSourse}</p>
              ))}
            </div>
          </div>
          <div className={styles.chartArea}>
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </div>
          <div className={styles.desciptionArea}>
            <div className={styles.descriptionSection}>
              <div className={styles.descriptionBox}>
                <p className={styles.descriptionTitle}>{title}</p>
                <p className={styles.descriptionContent}>{description}</p>
              </div>
              <div className={styles.helperBox}>
                <p className={styles.helperTitle}> 차트보는 방법</p>
                <p className={styles.helperContent}>{helperText}</p>
              </div>
              <p>{IoInformationCircleSharp}</p>
            </div>
            <div className={styles.youtubeSection}>
              {youtubeUrl ? (
                <iframe
                  id='player'
                  type='text/html'
                  width='100%'
                  height='100%'
                  src={`https://www.youtube.com/embed/${youtubeUrl}?start=${startSecond}`}
                  frameBorder='0'
                  title={title}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
