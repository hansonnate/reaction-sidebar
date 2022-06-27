// import App from "components/EditableTable/App";
import React from "react";
// import EditableTable from "../../../components/BasicTable/EditableTable.jsx";
import Editor from "components/tables/EditableTable/App.jsx";

export function Manual() {
    // const getData = () => [
    //       {
    //         email: "IlikeCheese@cheeseits.com",
    //         firstname: "Big",
    //         lastname: "Cheese",
    //         locale: "EN",
    //         company: "CheezeIts.inc",
    //       },
    //     ];
    // let columns = React.useMemo(
    //     () => [
    //       {
    //         Header: "Email",
    //         accessor: "email",
    //       },
    //       {
    //         Header: "First Name",
    //         accessor: "firstname",
    //       },
    //       {
    //         Header: "Last Name",
    //         accessor: "lastname",
    //       },
    //       {
    //         Header: "Locale",
    //         accessor: "locale",
    //       },
    //       {
    //         Header: "Company",
    //         accessor: "company",
    //       },
    //     ],
    //     []
    //   );
  return (
    <>
      {/* <EditableTable columns={columns} modalTitle="New Project"/> */}
      <Editor></Editor>
    </>
  );
}
