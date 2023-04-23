import React, { useEffect, useState } from "react";
import styles from "./TopicNews.module.css";
import axios from "axios";
import { formatAgo } from "../../util/date";

const RECOMMEND_KEYWORD = [
  "부동산",
  "거래량",
  "미분양",
  "전세가율",
  "금리",
  "PIR",
  "HAI",
];

export default function TopicNews() {
  const [keyword, setKeyword] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(
      (Math.random() * 10) % RECOMMEND_KEYWORD.length
    );
    setSelectedKeyword(RECOMMEND_KEYWORD[randomIndex]);
  }, []);

  useEffect(() => {
    if (!selectedKeyword) return;
    axios
      .get(`http://localhost:5000/newsSearch?keyword=${selectedKeyword}`, {
        withCredentials: true,
      })
      .then((response) => {
        setArticles(response.data.data);
      });
  }, [selectedKeyword]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.type === "keyup") {
      e.code === "Enter" && setSelectedKeyword(keyword);
    } else {
      setSelectedKeyword(keyword);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.inner}>
          <div className={styles.searchArea}>
            <input
              className={styles.inputBox}
              type='text'
              value={keyword}
              onChange={handleKeyword}
              onKeyUp={handleSubmit}
            />
            <button className={styles.inputBtn} onClick={handleSubmit}>
              검 색
            </button>
          </div>
          <div className={styles.recommendArea}>
            <p> 추천 검색어 </p>
            {RECOMMEND_KEYWORD.map((item, index) => (
              <div
                key={index}
                className={`${styles.recommend} ${
                  selectedKeyword.toUpperCase() === item ? styles.active : ""
                }`}
                onClick={() => {
                  setSelectedKeyword(item);
                }}
              >
                #{item}
              </div>
            ))}
          </div>
          <div className={`${styles.resultArea} scrollBar`}>
            <div className={styles.articlesContainer}>
              {articles.map((article, index) => (
                <a
                  key={index}
                  className={styles.articleContainer}
                  href={article.link}
                  target='_blank'
                >
                  <p
                    className={styles.articleTitle}
                    dangerouslySetInnerHTML={{ __html: article.title }}
                  ></p>
                  <p className={styles.articlePubDate}>
                    {formatAgo(article.pubDate, "ko")}
                  </p>
                  <p
                    className={styles.articleDescription}
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  ></p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
