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

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  function _onItalicClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  }
  function _onStrikethroughClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  }
  return (
    <div className={styles.editor}>
      <button onClick={_onBoldClick.bind(this)}>B</button>
      <button onClick={_onItalicClick.bind(this)}>I</button>
      <button onClick={_onStrikethroughClick.bind(this)}>Strike</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};
