import React from "react";

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
    <div className={`d-flex flex-row ${fullHeight ? "h-100" : ""}`}>
      <div className={leftClasses}>{left}</div>
      {divider && <div className="vr" />}
      <div className={rightClasses}>{right}</div>
    </div>
  );
};
