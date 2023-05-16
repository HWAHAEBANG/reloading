import React, { useEffect, useState } from "react";
import styles from "./AllCharts.module.css";
import ChartCard from "../chart-card/ChartCard";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
// import { mockData } from "../../data/mockdata";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AllCharts() {
  //select =============================================
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("인기순");
  // ===================================================
  // select ============================================
  const handleSelectSort = (e) => {
    setSelectedSort(e.target.innerText);
    setSortVisible((prev) => !prev);
  };
  // ===================================================
  // fetch data ========================================
  const userInfo = useSelector((state) => state.userInfo);

  const [chartsData, setChartsData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/allCharts`, {
        method: "GET",
        withCredentials: true,
        params: {
          userId: userInfo.userInfo.id, // 클라이언트에서 현재 로그인 중인 회원의 ID 변수를 전달
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          return;
          // setChartsData(`일치하는 정보가 없습니다.`);
        } else setChartsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("디비연결 이상무", chartsData);
  // ===================================================
  // search filter ===================================== // 블로그 포스팅
  const [keyword, setKeyword] = useState("");
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const [filteredChartsData, setFilteredChartsData] = useState(chartsData);

  useEffect(() => {
    chartsData && keyword
      ? setFilteredChartsData(
          chartsData.filter((data) =>
            data.title
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(keyword.toLowerCase().replace(/\s/g, ""))
          )
        )
      : setFilteredChartsData(chartsData);
  }, [chartsData, keyword]);

  // ===================================================
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.topArea}>
          <div>ALL CHARTS</div>
          <div className={styles.searchSection}>
            <input
              className={styles.inputBox}
              type='text'
              value={keyword}
              onChange={handleKeyword}
              // onKeyUp={handleSubmit} // 자동 검색으로 변경 완료
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
          <div
            className={
              filteredChartsData && filteredChartsData.length < 5
                ? `${styles.under5ea}`
                : `${styles.wholeContentsArea}`
            }
          >
            {filteredChartsData &&
              filteredChartsData.map((data) => (
                <ChartCard key={data.id} data={data} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
