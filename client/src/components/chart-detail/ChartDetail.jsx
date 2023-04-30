import React, { Suspense, lazy } from "react";
import styles from "./ChartDetail.module.css";
import { useLocation } from "react-router-dom";
const Pir = lazy(() => import("../../graph/Pir"));
const Hai = lazy(() => import("../../graph/Hai"));
const UnsoldHouse = lazy(() => import("../../graph/UnsoldHouse"));

const componentMapping = {
  pir: Pir,
  hai: Hai,
  unsold: UnsoldHouse,
};

export default function ChartDetail() {
  const {
    state: { data },
  } = useLocation();

  const Component = componentMapping[data.type];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Suspense>{/* <Component /> */}</Suspense>
        {/* {data.title} */}
      </div>
    </div>
  );
}
