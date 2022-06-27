import React, { useState } from "react";
//import styles from "./NumSlider.module.scss";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NumSlider = ({ value, min, max, step, onChange }) => {
  const [val, setValue] = useState(value);

  const handleChange = (e, val) => {
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  const StyledSlider = styled(Slider)({
    marginTop: "50px",
    color: "#d8d9d9",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
      color: "#15bcc7"
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "3px solid #15bcc7",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#15bcc7",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  return (
    <StyledSlider
      defaultValue={val}
      onChangeCommitted={handleChange}
      min={Number(min)}
      max={Number(max)}
      step={Number(step)}
      valueLabelDisplay="auto"
    />
  );
};
