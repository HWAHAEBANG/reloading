import React from "react";
import Hai from "../../graph/Hai";
import styles from "./Dashboard.module.css";
import UnsoldHouse from "../../graph/UnsoldHouse";
import Pir from "../../graph/Pir";
import PriceChangeRate from "../../graph/PriceChangeRate";
import Gauge from "../../graph/Gauge";
import SpiderWeb from "../../graph/SpiderWeb";
import AmountAndPrice from "../../graph/AmountAndPrice";
import JeonsePriceRatio from "../../graph/JeonsePriceRatio";
import { Link } from "react-router-dom";
import Signal from "../../graph/Signal";

// 현재 서울 기준으로 하였음 추후 리팩토링 필요할 수도.
export default function Dashboard() {
  return (
    <div className={styles.gridContainer}>
      <Link to='/allCharts/hai' className={`${styles.box} ${styles.box1}`}>
        <Hai />
      </Link>
      <Link
        to='/allCharts/spiderWeb'
        className={`${styles.box} ${styles.box2}`}
      >
        <SpiderWeb />
      </Link>
      <Link to='/allCharts/gauge' className={`${styles.box} ${styles.box3}`}>
        <Gauge />
      </Link>
      {/* <Link to='/allCharts' className={`${styles.box} ${styles.box4}`}>
        Box 4
      </Link> */}
      <Link to='/allCharts/pir' className={`${styles.box} ${styles.box5}`}>
        <Pir />
      </Link>
      <Link
        to='/allCharts/amountAndPrice'
        className={`${styles.box} ${styles.box6}`}
      >
        <AmountAndPrice />
      </Link>
      <Link to='/allCharts' className={`${styles.box} ${styles.box7}`}>
        <Signal />
      </Link>
      <Link
        to='/allCharts/priceChangeRate'
        className={`${styles.box} ${styles.box8}`}
      >
        <PriceChangeRate />
      </Link>
      <Link
        to='/allCharts/unsoldHouse'
        className={`${styles.box} ${styles.box9}`}
      >
        <UnsoldHouse />
      </Link>
      <Link
        to='/allCharts/jeonsePriceRatio'
        className={`${styles.box} ${styles.box10}`}
      >
        <JeonsePriceRatio />
      </Link>
    </div>
  );
}
