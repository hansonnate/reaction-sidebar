import React from "react";
import styles from "./SplitHorizontal.module.scss";

/**
 * A component that splits a container into two halves.
 * @param children accepts an array of TWO React elements. The first will be displayed on the left of the split, the second on the right.
 * @param {boolean} leftShrink a boolean that determines if the left element should be shrunk to fit content
 * @param {boolean} rightShrink a boolean that determines if the right element should be shrunk to fit content
 * @param {int} leftWidth a number (0-12) that determines the width of the left element. The right element will be 12 - leftWidth
 * @param {boolean} fullHeight a boolean that determines if the elements should be full height
 * @param {boolean} divider a boolean that determines if a divider should be placed between the two elements
 * @returns {React.ReactElement} a split horizontal component
 */
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
    leftClasses.push(`col-${leftWidth}`);
    rightClasses.push(`col-${12 - leftWidth}`);
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
