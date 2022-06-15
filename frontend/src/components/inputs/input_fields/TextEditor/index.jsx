import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { styled, Box } from '@material-ui/core';
import DraftJsEditor from '../DraftJs';

const TextEditorWrapper = styled(Box)({
  width: "100%",
});

const TextEditor = (props) => {
  const { editableNote } = props;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    editableNote
      ? setEditorState(editableNote.note)
      : setEditorState(EditorState.createEmpty());
  }, [editableNote]);

  return (
    <TextEditorWrapper>
      <DraftJsEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </TextEditorWrapper>
  );
};

export default TextEditor;
