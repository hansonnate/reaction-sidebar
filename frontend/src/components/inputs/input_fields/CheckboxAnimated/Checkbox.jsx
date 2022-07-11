import React, { useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";
import styles from "./Checkbox.module.scss";

function Checkbox({ checked, onChange }) {
  // eslint-disable-next-line
  // const [isChecked, setIsChecked] = useState(checked);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: checked ? "#2A627C" : "#fff",
    borderColor: checked ? "#2A627C" : "#ddd",
    borderRadius: "5px",
    config: config.gentle,
    ref: checkboxAnimationRef,
    cursor: "pointer"
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: checked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    checked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <label>
      <input
        type="checkbox"
        onChange={onChange}
        className={styles.check}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`${styles.checkbox} ${checked ? "checkbox--active" : ""}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
    </label>
  );
}

export default Checkbox;
