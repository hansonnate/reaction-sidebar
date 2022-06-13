import React from "react";
import styles from "./SplitHorizontal.module.scss";

export const SplitHorizontal = ({
  children,
  leftShrink,
  rightShrink,
  leftWidth,
  fullHeight,
  divider,
}) => {
  const [left, right] = children;

  const leftClasses = [leftShrink ? "flex-shrink-1" : "flex-grow-1"];
  const rightClasses = [rightShrink ? "flex-shrink-1" : "flex-grow-1"];

  if (leftWidth) {
    leftClasses.push(`w-${leftWidth}`);
    rightClasses.push(`w-${100 - leftWidth}`);
  }

  return (
    <div
      className={`d-flex flex-row w-100 flex-grow ${
        fullHeight && "flex-grow overflow-y-clip"
      }`}
    >
      <div className={`${leftClasses.join(" ")} overflow-y-clip`}>{left}</div>
      {divider && <div className={"vr " + styles.divider} />}
      <div className={`${rightClasses.join(" ")} overflow-y-clip`}>{right}</div>
    </div>
  );
};
