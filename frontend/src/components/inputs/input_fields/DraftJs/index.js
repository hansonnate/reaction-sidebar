import React, { useRef, useState } from "react";
import Draft from "draft-js";
import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import HtmlViewControl from "./HtmlViewControl";
import { styled, Box } from "@material-ui/core";
import "./rich.css";
import { stateToHTML } from "draft-js-export-html";
// import { stateFromHTML } from "draft-js-import-html";
import style from "./DraftJs.module.scss";
import createStyles from "draft-js-custom-styles";

const customStyleMap = {
  FONT_SIZE_30: {
    textAlign: "center",
  },
  ALIGNC: {
    textAlign: "center",
  },
};

// Passing the customStyleMap is optional
const { styles, customStyleFn, exporter } = createStyles(
  ["font-size", "color", "text-transform"],
  "CUSTOM_",
  customStyleMap
);

const EditorWrapper = styled(Box)({
  borderRadius: "5px",
  border: "1px solid #ededed",
  width: "100%",
});

const ToolbarWrapper = styled(Box)({
  padding: 10,
  background: "#EFEFEF",
});

const {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  EditorState,
  ContentState,
  convertFromHTML,
} = Draft;

export default function DraftJsEditor({ editorState, setEditorState }) {
  const [editorContentHTML, setHTMLContent] = useState();
  const [isHTML, setIsHTML] = useState(false);

  const editorRef = useRef(null);

  const focus = () => editorRef.current.focus();
  const onChange = (editorState) => setEditorState(editorState);

  const _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const _mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const _onHTMLClick = () => {
    if (isHTML === true) {
      //   importHTML();
      const blocksFromHTML = convertFromHTML(editorContentHTML);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      setIsHTML(false);
    } else {
      const inlineStyles = exporter(editorState);
      setHTMLContent(
        stateToHTML(editorState.getCurrentContent(), { inlineStyles })
      );
      //   exportHTML();
      setIsHTML(true);
    }
  };

  function _toggleBlockType(blockType) {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  function _toggleInlineStyle(inlineStyle) {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  const toggleFontSize = (fontSize) => {
    const newEditorState = styles.fontSize.toggle(editorState, fontSize);

    return setEditorState(newEditorState);
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  } else {
    className += " RichEditor-hidePlaceholder";
  }

  return (
    <EditorWrapper className="RichEditor-root">
      <ToolbarWrapper>
        <InlineStyleControls
          editorState={editorState}
          onToggle={_toggleInlineStyle}
          toggleFontSize={toggleFontSize}
        />

        <BlockStyleControls
          editorState={editorState}
          onToggle={_toggleBlockType}
        />
        <HtmlViewControl
          editorState={editorState}
          onToggle={_onHTMLClick}
          active={isHTML}
        />
      </ToolbarWrapper>
      <div className={className} onClick={focus}>
        {isHTML === false ? (
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleFn={customStyleFn}
            customStyleMap={customStyleMap}
            editorState={editorState}
            handleKeyCommand={_handleKeyCommand}
            keyBindingFn={_mapKeyToEditorCommand}
            onChange={onChange}
            placeholder="Type to compose email..."
            ref={editorRef}
            spellCheck={true}
          />
        ) : (
          <div className={style.htmleditbox}>
            <textarea
              className={style.htmltextarea}
              // type="text"
              value={editorContentHTML}
              onChange={(e) => setHTMLContent(e.target.value)}
              // value={convertedContent}
              // onChange={updateHTML}
            ></textarea>
          </div>
        )}
      </div>
    </EditorWrapper>
  );
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "left":
      return "align-left";
    case "center":
      return "align-center";
    case "right":
      return "align-right";
    default:
      return null;
  }
}
