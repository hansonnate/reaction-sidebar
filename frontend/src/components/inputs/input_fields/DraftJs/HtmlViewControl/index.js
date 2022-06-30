import React from "react";
import { HtmlIcon } from "../../resources";
import { styled, Box } from "@material-ui/core";
import StyleButton from "../StyleButton";

const InlineIconWrapper = styled(Box)({
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRight: "1px solid #ccc",
  display: "inline-block",
});

const HTML_VIEWS = [{ label: "html", icon: <HtmlIcon />, style: "html" }];

export default function HtmlViewControl(props) {
//   const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <React.Fragment>
      <InlineIconWrapper>
        {HTML_VIEWS.map((type, i) => (
          <StyleButton
            key={i}
            active={props.active}
            label={type.label}
            icon={type.icon}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </InlineIconWrapper>
    </React.Fragment>
  );
}
