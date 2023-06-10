import Particles from "react-particles";
import { loadFull } from "tsparticles";

import React, { useCallback } from "react";

export default function Particle() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 40,
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#FFFFFF", "#757676", "#f1f1f1", "#005766", "#66cdaa"],
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 3,
            random: false,
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: {
              enable: true,
              // mode: ClickMode.push,
            },
            resize: true,
          },
        },
        background: {
          image:
            "linear-gradient(229deg,rgba(0, 0, 0, 1) 0%,rgba(33, 36, 37, 1) 100%)",
        },
      }}
    />
  );
}
