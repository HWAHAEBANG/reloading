import React from "react";
import styles from "./TopBar.module.css";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfoAction, logoutAction } from "../../redux";
import axios from "axios";

export default function TopBar({ showNav, setShowNav }) {
  const navigate = useNavigate();

  const enter = () => {
    navigate("/users/login");
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const logout = () => {
    axios
      .post(
        `http://reloading-env.eba-7nrbgs4x.ap-northeast-2.elasticbeanstalk.com/users/logout`,
        {
          method: "POST",
          withCredentials: true,
          data: {
            presentId: userInfo.userInfo.id,
          },
        }
      )
      .then((Response) => {
        dispatch(logoutAction());
        dispatch(clearUserInfoAction());
        navigate("/users/login");
      });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.navBtn}
        onClick={() => setShowNav((prev) => !prev)}
      >
        {showNav ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
      </div>
      <div className={styles.logoBox}>
        <Link to='/'>
          <h2 className={styles.logo1}>RE:LOADING</h2>
        </Link>
        <RxCross2 className={styles.crossIcon} />
        <a href='https://www.weolbu.com/' target='_blank'>
          <img
            className={styles.logo2}
            src={process.env.PUBLIC_URL + "/image/logo.png"}
            alt='월부로고'
          />
        </a>
      </div>
      {/* <button onClick={enter}>임시포탈</button> */}
      {isLoggedIn.isLoggedIn ? (
        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      ) : (
        <button className={styles.logoutBtn} onClick={enter}>
          Login
        </button>
      )}
    </div>
  );
}
