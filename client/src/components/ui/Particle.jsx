// Particle.jsx
import React, { useEffect, useRef } from "react";
import styles from "./Background.module.css";

export default function Particle() {
  const particleRef = useRef(null);

  useEffect(() => {
    const particle = particleRef.current;
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    const rndw = Math.floor(Math.random() * w) + 1;
    const rndh = Math.floor(Math.random() * h) + 1;
    const widthpt = Math.floor(Math.random() * 8) + 3;
    const opty = Math.floor(Math.random() * 5) + 2;
    const anima = Math.floor(Math.random() * 12) + 8;
    particle.style.marginLeft = rndw + "px";
    particle.style.marginTop = rndh + "px";
    particle.style.width = widthpt + "px";
    particle.style.height = widthpt + "px";
    particle.style.background = "white";
    particle.style.opacity = opty;
    particle.style.animation = `move ${anima}s ease-in infinite `;
  }, []);

  return <div className={styles.particle} ref={particleRef}></div>;
}
