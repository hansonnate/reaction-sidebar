import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import styles from "./Loading.module.scss";

export const Loading = ({ height = 200, width = 200, fullScreen, message }) => {
  return (
    <div className={`${fullScreen && styles.fullScreen}`}>
      <Player
        autoplay
        loop
        src={require("assets/animations/loading_animation.json")}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
      {message && <p>{message}</p>}
    </div>
  );
};
