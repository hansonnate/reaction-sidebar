import React from "react";
import { styled, Box } from "@material-ui/core";

const IconWrapper = styled(Box)({
  paddingLeft: "5px",
  paddingRight: "5px",
  color: "#999",
  cursor: "pointer",
  display: "inline-block"
});

export default function StyleButton(props) {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  const iconComponent = () => {
    let Component = props.icon;
    return React.cloneElement(Component, {
      color: props.active ? "#1488FC" : undefined,
      selected: props.active,
      label: props.label,
      type: props.style
    });
  };

  return <IconWrapper onMouseDown={onToggle}>{iconComponent()}</IconWrapper>;
}
