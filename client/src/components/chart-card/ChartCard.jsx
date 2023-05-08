import React, { useState } from "react";
import styles from "./ChartCard.module.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ChartCard({
  data,
  data: { id, thumbnail, title, subTitle, description },
}) {
  const navigate = useNavigate();
  const enter = () => {
    navigate(`/allCharts/${id}`, { state: { data: data } });
  };

  const [onLike, setOnLike] = useState(false);
  const handleOnLike = (e) => {
    e.stopPropagation();
    setOnLike((prev) => !prev);
  };

  const randomIndex = Math.floor((Math.random() * 10) % 5);

  // const randomIndex = 4;

  // console.log("확인", data);

  return (
    <div
      onClick={enter}
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
        <img src={`${process.env.PUBLIC_URL} ${thumbnail}`} alt='' />
        {/* "+" 필요없음 */}
      </div>
      <div className={styles.textArea}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
        </div>
        <p className={styles.description}>{subTitle}</p>
      </div>
    </div>
  );
}
