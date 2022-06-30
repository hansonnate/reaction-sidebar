import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import style from "./TextEdit.module.scss";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import EditorToolbar from "./EditorToolbar/EditorToolbar";
import createStyles from "draft-js-custom-styles";
//use the 'font-size' CSS property with #styles, and #customStyleFn

const { styles, customStyleFn } = createStyles(["font-size"]);

/*eslint-disable no-unused-labels*/
export const TextEdit = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContentHTML, setHTMLContent] = useState();
  const [isHTML, setIsHTML] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [urlValue, setURLinput] = useState();
  const [showURL, setShowURLInput] = useState(false);
  //   const [convertedContent, setConvertedContent] = useState();

  const onChange = (editorState) => {
    setEditorState(editorState);
    // setHTMLContent(stateToHTML(editorState.getCurrentContent()));
  };

  //   const linkStrategy = (contentBlock, callback, contentState) => {
  //     contentBlock.findEntityRanges(
  //       (character) => {
  //         const entityKey = character.getEntity();
  //         return (
  //           entityKey !== null &&
  //           contentState.getEntity(entityKey).getType() === 'LINK'
  //         );
  //       },
  //       callback
  //     );
  //   };

  //   const Link = (props) => {
  //     const { contentState, entityKey } = props;
  //     const { url } = contentState.getEntity(entityKey).getData();
  //     return (
  //       <a
  //         className="link"
  //         href={url}
  //         rel="noopener noreferrer"
  //         target="_blank"
  //         aria-label={url}
  //       >{props.children}</a>
  //     );
  //   };

  //   const addLinkPluginPlugin = {
  //     keyBindingFn(event, { getEditorState }) {
  //       const editorState = getEditorState()
  //       const selection = editorState.getSelection();
  //       if (selection.isCollapsed()) {
  //         return;
  //       }
  //       if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
  //         return 'add-link'
  //       }
  //     }
  //   };

  const _addLink = (e) => {
    e.preventDefault();
    // const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // Apply entity
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    // Apply selection
    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    );

    setShowURLInput(false);
    setEditorState(nextEditorState);
    setURLinput("");
    // this.setState(
    //   {
    //     editorState: nextEditorState,
    //     showURLInput: false,
    //     urlValue: "",
    //   },
    //   () => {
    //     setTimeout(() => this.refs.editor.focus(), 0);
    //   }
    // );
  };
  const onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  };

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      //   this.setState({
      //     editorState: RichUtils.toggleLink(editorState, selection, null),
      //   });
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  const onHTMLClick = () => {
    if (isHTML === true) {
      //   importHTML();
      console.log(editorContentHTML);
      setEditorState(
        EditorState.createWithContent(stateFromHTML(editorContentHTML))
      );
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
    FONT_SIZE_30: {
      fontSize: "30px",
    },
    ALIGNC: {
      textAlign: "center",
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
  function _onHeadingOneClick() {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  }
  function _onHeadingTwoClick() {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
  }
  function _onHeadingThreeClick() {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-three"));
  }
  //   function _addLink() {
  //     const type = "LINK"
  //     // const editorState = this.state.editorState;
  //     const text = "google.com"
  //     const contentState = editorState.getCurrentContent();
  //     const selection = editorState.getSelection();
  //     const textWithSpace = text.concat(' ');
  //     // create new content with text
  //     const newContent = Modifier.insertText(
  //       contentState,
  //       selection,
  //       textWithSpace,
  //     );
  //     // create new link entity
  //     const newContentWithEntity = newContent.createEntity(
  //       type,
  //       'MUTABLE',
  //       "url",
  //       false,
  //     );
  //     const entityKey = newContentWithEntity.getLastCreatedEntityKey();
  //     // create new selection with the inserted text
  //     const anchorOffset = selection.getAnchorOffset();
  //     const newSelection = new SelectionState({
  //       anchorKey: selection.getAnchorKey(),
  //       anchorOffset,
  //       focusKey: selection.getAnchorKey(),
  //       focusOffset: anchorOffset + text.length,
  //     });
  //     // and aply link entity to the inserted text
  //     const newContentWithLink = Modifier.applyEntity(
  //       newContentWithEntity,
  //       newSelection,
  //       entityKey,
  //     );
  //     // create new state with link text
  //     const withLinkText = EditorState.push(
  //       editorState,
  //       newContentWithLink,
  //       'insert-characters',
  //     );
  //     // now lets add cursor right after the inserted link
  //     const withProperCursor = EditorState.forceSelection(
  //       withLinkText,
  //       newContent.getSelectionAfter(),
  //     );
  //     // update the editor with all changes
  //     // this.setState({editorState: withProperCursor });
  //     setEditorState(withProperCursor);
  //   }
  //   function _onAlignCenterClick() {
  //     setEditorState(RichUtils.toggleInlineStyle(editorState, "FONT_SIZE_30"));
  //   }
  function _onULClick() {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  }
  function _onOLClick() {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  }

  //   const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  return (
    <div className={style.editor}>
      <div className={style.editbuttons}>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onBoldClick.bind(this)}
          >
            B
          </button>
          <div className={style.buttondropdown}>
            <p>Bold, ⌘ + B</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onItalicClick.bind(this)}
          >
            I
          </button>
          <div className={style.buttondropdown}>
            <p>Italics, ⌘ + I</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onStrikethroughClick.bind(this)}
          >
            <strike>S</strike>
          </button>
          <div className={style.buttondropdown}>
            <p>Strikethrough</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onUnderlineClick.bind(this)}
          >
            <u>U</u>
          </button>
          <div className={style.buttondropdown}>
            <p>Underline, ⌘ + U</p>
          </div>
        </div>
        <div className={style.headerstyles}>
          <button className={style.headerbutton}>h</button>
          <div className={style.dropdowncontent}>
            <button
              className={style.singleletter}
              onClick={_onHeadingOneClick.bind(this)}
            >
              1
            </button>
            <button
              className={style.singleletter}
              onClick={_onHeadingTwoClick.bind(this)}
            >
              2
            </button>
            <button
              className={style.singleletter}
              onClick={_onHeadingThreeClick.bind(this)}
            >
              3
            </button>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onULClick.bind(this)}
          >
            <i className="bi bi-list-ul"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Unordered List</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={_onOLClick.bind(this)}
          >
            <i className="bi bi-list-ol"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Ordered List</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button className={style.singleletter} onClick={onHTMLClick}>
            <i className="bi bi-filetype-html"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>See Code</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button className={style.singleletter} onClick={onHTMLClick}>
            <i className="bi bi-pen"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Add Signature</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={() => setShowURLInput(!showURL)}
          >
            <i className="bi bi-link-45deg"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Add Hyperlink</p>
          </div>
        </div>
        {showURL === true && (
          <div style={styles.urlInputContainer}>
            <input
              onChange={(e) => setURLinput(e.target.value)}
              type="text"
              onKeyDown={() => onLinkInputKeyDown()}
            />
            <button onMouseDown={_addLink}> Confirm </button>
          </div>
        )}
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={removeLink}
          >
            <strike><i className="bi bi-shield-x"></i></strike>
          </button>
          <div className={style.buttondropdown}>
            <p>Remove Hyperlink</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={() => setTextAlign("left")}
          >
            <i className="bi bi-text-left"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Align Left</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={() => setTextAlign("center")}
          >
            <i className="bi bi-text-center"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Align Center</p>
          </div>
        </div>
        <div className={style.buttonstyle}>
          <button
            className={style.singleletter}
            onClick={() => setTextAlign("right")}
          >
            <i className="bi bi-text-right"></i>
          </button>
          <div className={style.buttondropdown}>
            <p>Align Right</p>
          </div>
        </div>
        <EditorToolbar
          editorState={editorState}
          setEditorState={setEditorState}
          //pass style as prop
          styles={styles}
        />
      </div>
      {isHTML === false && (
        <div className={style.editbox}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand.bind(this)}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
            placeholder="Write email here..."
            textAlignment={textAlign}
            // blockStyleFn={myBlockStyleFn}
          />
        </div>
      )}
      {isHTML === true && (
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
  );
};
