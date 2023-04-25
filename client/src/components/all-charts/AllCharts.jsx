import React, { useState } from "react";
import styles from "./AllCharts.module.css";
import ChartCard from "../chart-card/ChartCard";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";

export default function AllCharts() {
  //select =============================================
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정확도순");
  // ===================================================
  // select ====================================
  const handleSelectSort = (e) => {
    setSelectedSort(e.target.innerText);
    setSortVisible((prev) => !prev);
  };
  // -------====================================

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.topArea}>
          <div>ALL CHARTS</div>
          <div className={styles.searchSection}>
            <input
              className={styles.inputBox}
              type='text'
              // value={keyword}
              // onChange={handleKeyword}
              // onKeyUp={handleSubmit}
              placeholder='키워드를 입력해주세요.'
            />
            <button
              className={styles.inputBtn}
              // onClick={handleSubmit}
            >
              <FiSearch />
            </button>
            <div className='selectBox'>
              <div
                className='pl on'
                onClick={() => setSortVisible((prev) => !prev)}
              >
                {selectedSort}
                {sortVisible ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
              </div>
              <ul
                className={sortVisible ? "listbox  visible" : "listbox"}
                id='listbox'
              >
                <li onClick={handleSelectSort}>
                  <div className='list'>인기순</div>
                </li>
                <li onClick={handleSelectSort}>
                  <div className='list'>최신순</div>
                </li>
                <li onClick={handleSelectSort}>
                  <div className='list'>조회수 순</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.inner} scrollBar`}>
          <div className={styles.wholeContentsArea}>
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
          </div>
        </div>
      </div>
    </div>
  );
}
