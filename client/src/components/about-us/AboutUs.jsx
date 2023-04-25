import React from "react";
import styles from "./AboutUs.module.css";
import Hai from "../../graph/Hai";
import Gauge from "../../graph/Gauge";
import PolarChart from "../../graph/PolarChart";

export default function AboutUs() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={`${styles.inner} scrollBar`}>
          <div className={styles.wholeContentsArea}>
            <div className={styles.pageIntroArea}>
              <PolarChart />
              {/* <div className={styles.textSection}>
                <p>
                  기회는 다시 돌아온다. <br />그 날을 위해 "재장전"하라!
                </p>
                <p>
                  <span>"Reloading"</span>은 우리 말로 <span>"재장전"</span>을
                  의미합니다.
                  <br />
                  부동산 시장에서 한 차례의 폭등장이 끝이나고, 하락장에
                  접어들었습니다. <br />
                  부동산 시장이 긴 싸이클을 가지고 반복하듯 반등의 기회는 또
                  다시 돌아올 것입니다.
                  <br />
                  부동산 시장의 상태를 진단하고 어느정도 예측할 수 있는 다양한
                  지표들이 있습니다.
                  <br /> <span>"Reloading"</span>은 부동산 시장의 각종 지표들을
                  실시간으로 추적하여 도표로 표현하고, 이를 대시보드 형태로
                  지원합니다.
                  <br />
                  이를 통해 사용자가 최적매수시기를 결정할 수 있도록 조력자가
                  되겠습니다
                  <br />
                </p>
                <span></span>
              </div>
              <div className={styles.imgSection}>
                </div> */}
              {/* <img
                  src={process.env.PUBLIC_URL + "/image/bullet.png"}
                  alt='bullet'
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
