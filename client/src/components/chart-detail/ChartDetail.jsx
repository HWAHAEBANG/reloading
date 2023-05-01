import React, { Suspense, lazy } from "react";
import styles from "./ChartDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
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

  const goToList = () => {
    navigate("/allCharts");
  };

  const {
    state: {
      data: { id, title, subTitle, description, youtubeUrl, startSecond },
    },
  } = useLocation();

  const Component = componentMapping[id];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.inner}>
          <button className={styles.back} onClick={goToList}>
            목록
          </button>
          <div className={styles.chartArea}>
            <div className={styles.alignHelper}>
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            </div>
          </div>
          <div className={styles.desciptionArea}>
            <div className={styles.descriptionSection}>
              <p>{title}</p>
              <p>{description}</p>
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
          {/* {data.title} */}
        </div>
      </div>
    </div>
  );
}
