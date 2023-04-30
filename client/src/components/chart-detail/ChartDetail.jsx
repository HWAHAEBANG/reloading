import React, { Suspense, lazy } from "react";
import styles from "./ChartDetail.module.css";
import { useLocation } from "react-router-dom";
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
  const {
    state: { data },
  } = useLocation();

  const Component = componentMapping[data.id];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
        {/* {data.title} */}
      </div>
    </div>
  );
}
