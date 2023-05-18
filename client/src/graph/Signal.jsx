import React, { useState } from "react";
import styles from "./Signal.module.css";
import RedLamp from "../components/ui/RedLamp";
import GreenLamp from "../components/ui/GreenLamp";
import RingLoader from "react-spinners/RingLoader";

export default function Signal() {
  // loading ===========================
  const loaderBox = {
    display: "flex",
    justifyContents: "center",
    alignItems: "center",
    height: "450px",
  };

  const override = {
    display: "block",
    margin: "auto",
  };

  const [loading, setLoading] = useState(false);
  // ===================================
  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div style={loaderBox}>
          <RingLoader
            color='#36d7b7'
            loading={loading}
            cssOverride={override}
            size={200}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <div className={styles.inner}>
          <span className={styles.title}>
            시장 반등의 증상과 현황
            <br />
            <span className={styles.label}>(기준 : 서울)</span>
          </span>

          <div className={styles.contents}>
            <div className={styles.content}>
              <p className={styles.symptom}>
                <span className={styles.counter}>증상1</span>
                <span>&nbsp;&nbsp;월별 매매 거래량이 1만건을 초과한다.</span>
              </p>
              <div className={styles.situation}>
                <GreenLamp />
                <div className={styles.text}>
                  <p> 현재 매매 거래량이 1만건을 돌파하였습니다.</p>
                  <p>
                    <span>2023년 5월</span> 기준 거래량 <span>11000건</span>{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.content}>
              <p className={styles.symptom}>
                <span className={styles.counter}>증상2</span>
                <span>
                  &nbsp;&nbsp;월별 매매 거래량이 전세 거래량을 추월한다.
                </span>
              </p>
              <div className={styles.situation}>
                <RedLamp />
                <div className={styles.text}>
                  <p> 현재 전세 거래량이 보다 우세합니다.</p>
                  <p>
                    <span>2023년 5월</span> 기준 거래량 <span>11000건</span>{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.content}>
              <p className={styles.symptom}>
                <span className={styles.counter}>증상3</span>
                <span>&nbsp;&nbsp;매매가 상승세가 1년이상 지속된다.</span>
              </p>
              <div className={styles.situation}>
                <GreenLamp />
                <div className={styles.text}>
                  <p> 현재 상승세가 7개월간 지속되고 있습니다.</p>
                  <p>
                    <span>2023년 5월</span> 기준 거래량 <span>11000건</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
