

import React, {useEffect, useState} from "react";
import { animated, useSpring } from 'react-spring';


export const Shake = ({ rotation = 0, timing = 150, children }) => {
  const [isBooped, setIsBooped] = useState(false);
  const style = useSpring({
    display: 'inline-block',
    width: '100%',
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `rotate(${rotation}deg)`
      : `rotate(0deg)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });
  useEffect(() => {
    // We only want to act when we're going from
// not-booped to booped.
if (!isBooped) {
  return;
}
const timeoutId = window.setTimeout(() => {
  setIsBooped(false);
}, timing);
// Just in case our component happens to
// unmount while we're booped, cancel
// the timeout to avoid a memory leak.
return () => {
  window.clearTimeout(timeoutId);
};
// Trigger this effect whenever `isBooped`
// changes. We also listen for `timing` changes,
// in case the length of the boop delay is
// variable.
}, [isBooped, timing]);
const trigger = () => {
  setIsBooped(true);
};

  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};