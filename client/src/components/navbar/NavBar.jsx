import React, { useState } from "react";
import styles from "./NavBar.module.css";
import {
  BsFillBellFill,
  BsYoutube,
  BsFillChatLeftHeartFill,
} from "react-icons/bs";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { IoIosCafe, IoIosHome, IoIosPeople } from "react-icons/io";
// import { HiBellAlert } from "react-icons/hib";
import { MdSpaceDashboard } from "react-icons/md";
import { FcComboChart } from "react-icons/fc";
import { ImNewspaper } from "react-icons/im";
import { GrBarChart } from "react-icons/gr";
import { AiOutlineBarChart } from "react-icons/ai";
import Background from "../ui/Background";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar({ showNav, setShowNav }) {
  const [autoClose, setAutoClose] = useState(true);

  const handleChecked = (e) => {
    setAutoClose(e.target.checked);
  };

  //autoClose가 true일 때, 버튼누르면 setShowNav(false)로
  const handleEnter = () => {
    autoClose && setShowNav(false);
  };

  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div
      className={`${styles.mainContainer} ${
        showNav ? styles.innerContainer : ""
      }`}
    >
      <div className={styles.userInfoSection}>
        <div className={styles.userInfo}>
          {
            /* userInfo.avatar */ true ? (
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatar}
                  src={process.env.PUBLIC_URL + "/image/HHB.jpg"}
                  alt='프로필 사진'
                />
              </div>
            ) : (
              <FaUserCircle className={styles.alternativeAvartarIcon} />
            )
          }
          <div>
            <p>
              환영합니다.
              <br />
              <span>
                {userInfo && userInfo.userInfo && userInfo.userInfo.name}
              </span>
              님
            </p>
          </div>
        </div>
        <div className={styles.buttonList}>
          <Link to='/users/editUserInfo'>
            <div>
              &nbsp;
              <FaUserEdit />
            </div>
          </Link>
          <div>
            <BsFillBellFill />
          </div>
        </div>
      </div>
      <hr />
      <label>
        <span className={styles.toggleName}>자동 닫기</span>
        <input
          onChange={handleChecked}
          defaultChecked={autoClose}
          role='switch'
          type='checkbox'
        />
      </label>
      <div className={styles.menuSection}>
        <Link to='/'>
          <div className={styles.menuList} onClick={handleEnter}>
            <MdSpaceDashboard />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to='/aboutUs'>
          <div className={styles.menuList} onClick={handleEnter}>
            <IoIosPeople />
            <p>About Us</p>
          </div>
        </Link>
        <Link to='/allCharts'>
          <div className={styles.menuList} onClick={handleEnter}>
            <AiOutlineBarChart />
            <p>All Charts</p>
          </div>
        </Link>
        <Link to='/myCharts'>
          <div className={styles.menuList} onClick={handleEnter}>
            <BsFillChatLeftHeartFill />
            <p>My Charts</p>
          </div>
        </Link>
        <Link to='/topicNews'>
          <div className={styles.menuList} onClick={handleEnter}>
            <ImNewspaper />
            <p>Topic News</p>
          </div>
        </Link>
      </div>
      <dir className={styles.otherLinkSection}>
        <div className={styles.linkList} onClick={handleEnter}>
          <IoIosHome />
          <a href='https://www.weolbu.com/' target='_blank'>
            공식 홈페이지
          </a>
        </div>
        <div className={styles.linkList} onClick={handleEnter}>
          <BsYoutube />
          <a href='https://www.youtube.com/@weolbu_official' target='_blank'>
            월급쟁이 부자들TV
          </a>
        </div>
        <div className={styles.linkList} onClick={handleEnter}>
          <IoIosCafe />
          <a href='https://cafe.naver.com/wecando7' target='_blank'>
            월급쟁이 부자들 네이버 카페
          </a>
        </div>
      </dir>
      {/* <Background /> */}
    </div>
  );
}
