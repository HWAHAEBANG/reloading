import React from "react";
import Hai from "../../graph/Hai";
import styles from "./Dashboard.module.css";
import UnsoldHouse from "../../graph/UnsoldHouse";
import Pir from "../../graph/Pir";

// 현재 서울 기준으로 하였음 추후 리팩토링 필요할 수도.
export default function Dashboard() {
  return (
    <div className={styles.gridContainer}>
      <div className={`${styles.box} ${styles.box1}`}>
        <Hai />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>Box 2</div>
      <div className={`${styles.box} ${styles.box3}`}>Box 3</div>
      <div className={`${styles.box} ${styles.box4}`}>Box 4</div>
      <div className={`${styles.box} ${styles.box5}`}>
        <Pir />
      </div>
      <div className={`${styles.box} ${styles.box6}`}>Box 6</div>
      <div className={`${styles.box} ${styles.box7}`}>Box 7</div>
      <div className={`${styles.box} ${styles.box8}`}>Box 8</div>
      <div className={`${styles.box} ${styles.box9}`}>
        <UnsoldHouse />
      </div>
      <div className={`${styles.box} ${styles.box10}`}>Box 10</div>
    </div>
  );
}
