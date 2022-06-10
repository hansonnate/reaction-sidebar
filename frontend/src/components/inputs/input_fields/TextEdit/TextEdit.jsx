import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import styles from "./TextEdit.module.scss";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
// import { convertToHTML, convertFromHTML } from "draft-convert";

/*eslint-disable no-unused-labels*/
export const TextEdit = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContentHTML, setHTMLContent] = useState();
  const [isHTML, setIsHTML] = useState(false);
  //   const [convertedContent, setConvertedContent] = useState();

  const onChange = (editorState) => {
    setEditorState(editorState);
    // setHTMLContent(stateToHTML(editorState.getCurrentContent()));
  };

  //   const exportHTML = () => {
  //     setConvertedContent(convertToHTML(editorState.getCurrentContent));
  //   };

  //   const updateHTML = (e) => {
  //     e.preventDefault();
  //     setConvertedContent(e.target.value);
  //   };

  //   const importHTML = () => {
  //     const { editorState } = editorState;
  //     onChange(EditorState.push(editorState, convertFromHTML(convertedContent)));
  //   };

  const onHTMLClick = () => {
    if (isHTML === true) {
      //   importHTML();
      console.log(editorContentHTML);
      setEditorState(EditorState.createWithContent(stateFromHTML(editorContentHTML)));
      setIsHTML(false);
    } else {
      setHTMLContent(stateToHTML(editorState.getCurrentContent()));
      //   exportHTML();
      setIsHTML(true);
    }
  };

  //    const onChange = editorState => setEditorState({editorState});
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return true;
    }

    return false;
  }

  //this is if we want to have more custom functionality
  const customStyleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through",
    },
    FONT_SIZE_30: {
      fontSize: "30px",
    },
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

  //   const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  return (
    <div className={styles.editor}>
      <div className={styles.editbuttons}>
        <button
          className={styles.singleletter}
          onClick={_onBoldClick.bind(this)}
        >
          B
        </button>
        <button
          className={styles.singleletter}
          onClick={_onItalicClick.bind(this)}
        >
          I
        </button>
        <button
          className={styles.singleletter}
          onClick={_onStrikethroughClick.bind(this)}
        >
          <strike>S</strike>
        </button>
        <button
          className={styles.singleletter}
          onClick={_onUnderlineClick.bind(this)}
        >
          <u>U</u>
        </button>
        <button className={styles.singleletter} onClick={onHTMLClick}>
          <i className="bi bi-filetype-html"></i>
        </button>
      </div>
      {isHTML === false && (
        <div className={styles.editbox}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand.bind(this)}
            customStyleMap={customStyleMap}
            placeholder="Write email here..."
          />
        </div>
      )}
      {isHTML === true && (
        <div className={styles.htmleditbox}>
          <textarea
            style={{ width: "100%" }}
            // type="text"
            value={editorContentHTML}
            onChange={(e) => setHTMLContent(e.target.value)}
            // value={convertedContent}
            // onChange={updateHTML}
          ></textarea>
        </div>
      )}
    </div>
  );
};
