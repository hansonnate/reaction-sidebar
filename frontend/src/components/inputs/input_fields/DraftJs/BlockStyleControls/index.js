import React, { useState } from "react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  OrderListIcon,
  UnorderListIcon,
  AlignRightIcon,
  HeadingsIcon,
  HeaderIcon,
} from "../../resources";
import { styled, Box } from "@material-ui/core";
import StyleButton from "../StyleButton";
import styles from "./BlockStyle.module.scss";

const InlineIconWrapper = styled(Box)({
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRight: "1px solid #ccc",
  display: "inline-block",
});

const BLOCK_TYPES = [
  { label: "align-left", icon: <AlignLeftIcon />, style: "left" },
  { label: "align-center", icon: <AlignCenterIcon />, style: "center" },
  { label: "align-right", icon: <AlignRightIcon />, style: "right" },
  {
    label: "ordered-list-item",
    icon: <OrderListIcon />,
    style: "ordered-list-item",
  },
  {
    label: "unordered-list-item",
    icon: <UnorderListIcon />,
    style: "unordered-list-item",
  },
  {
    label: "header-one",
    icon: <HeaderIcon />,
    style: "header-one",
  },
  {
    label: "header-two",
    icon: <HeaderIcon />,
    style: "header-two",
  },
  {
    label: "header-three",
    icon: <HeaderIcon />,
    style: "header-three",
  },
  {
    label: "header-four",
    icon: <HeaderIcon />,
    style: "header-four",
  },
  {
    label: "header-five",
    icon: <HeaderIcon />,
    style: "header-five",
  },
  {
    label: "header-six",
    icon: <HeaderIcon />,
    style: "header-six",
  },
];

export default function BlockStyleControls(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const [showHeadings, setShowHeadings] = useState(false);

  return (
    <React.Fragment>
      <InlineIconWrapper>
        {BLOCK_TYPES.slice(0, 3).map((type, i) => (
          <StyleButton
            key={i}
            icon={type.icon}
            onToggle={props.onToggle}
            label={type.label}
            style={type.style}
            active={type.style === blockType}
          />
        ))}
      </InlineIconWrapper>
      <InlineIconWrapper>
        {BLOCK_TYPES.slice(3, 5).map((type, i) => (
          <StyleButton
            key={i}
            icon={type.icon}
            onToggle={props.onToggle}
            label={type.label}
            style={type.style}
            active={type.style === blockType}
          />
        ))}
      {/* </InlineIconWrapper>
      <InlineIconWrapper> */}
        <StyleButton
          icon={<HeadingsIcon />}
          onToggle={() => setShowHeadings(!showHeadings)}
          label="headings"
          style="headings-button"
          active={showHeadings}
        />
      </InlineIconWrapper>
      {showHeadings === true && (
        <div className={styles.headings}>
          {BLOCK_TYPES.slice(5, 11).map((type, i) => (
            <StyleButton
              key={i}
              icon={type.icon}
              onToggle={props.onToggle}
              label={type.label}
              style={type.style}
              active={type.style === blockType}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
