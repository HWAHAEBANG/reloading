import React, { useEffect, useState } from "react";
import styles from "./MyCharts.module.css";
import ChartCard from "../chart-card/ChartCard";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

export default function MyCharts() {
  //select =============================================
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("인기순");
  // ===================================================
  // select ====================================
  const handleSelectSort = (e) => {
    setSelectedSort(e.target.innerText);
    setSortVisible((prev) => !prev);
  };
  // -------====================================

  const [test, setTest] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/users/test`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setTest(`일치하는 정보가 없습니다.`);
        } else setTest(`귀하의 이름은는"${response.data[0].title}" 입니다.`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.topArea}>
          <div>MY CHARTS</div>
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
                  <div className='list'>이름순</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.inner} scrollBar`}>
          <div className={styles.wholeContentsArea}>
            {test && test}
            {/* <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard />
            <ChartCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
