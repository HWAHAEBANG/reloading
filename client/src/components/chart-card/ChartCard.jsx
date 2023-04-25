import React, { useState } from "react";
import styles from "./ChartCard.module.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function ChartCard() {
  const [onLike, setOnLike] = useState(false);
  const handleOnLike = () => {
    setOnLike((prev) => !prev);
  };

  const randomIndex = Math.floor((Math.random() * 10) % 5);

  // const randomIndex = 4;

  return (
    <div
      className={
        randomIndex === 0
          ? `${styles.maincontainer0}`
          : randomIndex === 1
          ? `${styles.maincontainer1}`
          : randomIndex === 2
          ? `${styles.maincontainer2}`
          : randomIndex === 3
          ? `${styles.maincontainer3}`
          : `${styles.maincontainer4}`
      }
    >
      {/* 여기 */}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className={styles.topArea}>
        {onLike ? (
          <AiFillHeart onClick={handleOnLike} />
        ) : (
          <AiOutlineHeart onClick={handleOnLike} />
        )}
      </div>
      <div className={styles.chartImgArea}>
        <img src={process.env.PUBLIC_URL + "/image/test.png"} alt='' />{" "}
        {/* 여기 */}
      </div>
      <div className={styles.textArea}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>전세가율</div>
        </div>
        <p className={styles.description}>
          간단한간단한간단한간단한간단한간단한 요약 설명
        </p>
      </div>
    </div>
  );
}
