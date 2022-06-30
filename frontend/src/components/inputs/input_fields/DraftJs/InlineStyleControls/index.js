import React from "react";
import {
  BoldIcon,
  UnderlineIcon,
  ItalicIcon,
  StrikeThroughIcon,
} from "../../resources";
import { styled, Box } from "@material-ui/core";
import StyleButton from "../StyleButton";

const InlineIconWrapper = styled(Box)({
  paddingLeft: "10px",
  paddingRight: "10px",
  borderLeft: "1px solid #ccc",
  borderRight: "1px solid #ccc",
  display: "inline-block",
});

const INLINE_STYLES = [
  { label: "bold", icon: <BoldIcon />, style: "BOLD" },
  { label: "italic", icon: <ItalicIcon />, style: "ITALIC" },
  { label: "underline", icon: <UnderlineIcon />, style: "UNDERLINE" },
  {
    label: "strikethrough",
    icon: <StrikeThroughIcon />,
    style: "STRIKETHROUGH",
  },
];

export default function InlineStyleControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  const options = (x) =>
    x.map((fontSize) => {
      return (
        <option key={fontSize} value={fontSize}>
          {fontSize}
        </option>
      );
    });
  return (
    <>
      <InlineIconWrapper>
        {INLINE_STYLES.map((type, i) => (
          <StyleButton
            key={i}
            active={currentStyle.has(type.style)}
            label={type.label}
            icon={type.icon}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
        <select onChange={(e) => props.toggleFontSize(e.target.value)}>
          {options(["12px", "24px", "36px", "50px", "72px"])}
        </select>
      </InlineIconWrapper>
    </>
  );
}
