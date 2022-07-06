// import App from "components/EditableTable/App";
import React from "react";
// import EditableTable from "../../../components/BasicTable/EditableTable.jsx";
import Editor from "components/tables/EditableTable/App.jsx";
import Button from "components/buttons/Button/Button";

export function Manual() {
  return (
    <>
      <Editor></Editor>
      <Button>Upload</Button>
    </>
  );
}
