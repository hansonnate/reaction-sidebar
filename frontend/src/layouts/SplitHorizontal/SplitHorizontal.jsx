import React from "react";
import styles from "./SplitHorizontal.module.scss";

export const SplitHorizontal = ({
  children,
  leftShrink,
  rightShrink,
  fullHeight,
  divider,
}) => {
  const [left, right] = children;

  const leftClasses = [leftShrink ? "flex-shrink-1" : "w-100"];
  const rightClasses = [rightShrink ? "flex-shrink-1" : "w-100"];

  return (
    <div
      className={`d-flex flex-row w-100 ${fullHeight ? styles.fullHeight : ""}`}
    >
      <div className={leftClasses}>{left}</div>
      {divider && <div className={"vr " + styles.divider} />}
      <div className={rightClasses}>{right}</div>
    </div>
  );
};
