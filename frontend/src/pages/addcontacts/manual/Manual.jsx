// import App from "components/EditableTable/App";
import React from "react";
// import EditableTable from "../../../components/BasicTable/EditableTable.jsx";
import Editor from "components/EditableTable/App.jsx";
import Button from "components/Button/Button";

export function Manual() {
  return (
    <>
      <Editor></Editor>
      <Button>Upload</Button>
    </>
  );
}
