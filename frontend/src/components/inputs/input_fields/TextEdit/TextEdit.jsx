import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import styles from "./TextEdit.module.scss";

export const TextEdit = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //    const onChange = editorState => setEditorState({editorState});
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  }

  //this is if we want to have more custom functionality
  const customStyleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    FONT_SIZE_30: {
      fontSize: "30px"
    }
  };

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  function _onItalicClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  }
  function _onStrikethroughClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  }
  function _onUnderlineClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }
  return (
    <div className={styles.editor}>
      <div className={styles.editbuttons}>
        <button className={styles.singleletter} onClick={_onBoldClick.bind(this)}>B</button>
        <button className={styles.singleletter} onClick={_onItalicClick.bind(this)}>I</button>
        <button className={styles.singleletter} onClick={_onStrikethroughClick.bind(this)}><strike>S</strike></button>
        <button className={styles.singleletter} onClick={_onUnderlineClick.bind(this)}><u>U</u></button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};
