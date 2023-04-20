import React from "react";
import ReactPlayer from "react-player";
import styles from "./PassRoute.css";
import { useNavigate } from "react-router-dom";

export default function PassRoute() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/dashboard");
  }, 14000);

  return (
    <div>
      <ReactPlayer
        className={styles.react_player}
        url={process.env.PUBLIC_URL + "/video/permit.mp4"}
        height='auto'
        width='100vw'
        playing={true}
        controls={false}
        loop={false}
        volume={0.1}
        muted={false}
        style={{ position: "absolute", top: "-100px" }}
      />
    </div>
  );
}
