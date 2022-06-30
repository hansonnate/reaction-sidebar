// External
import React, { useState } from "react";
import styles from "./OrganizationDetails.module.scss";
import { TextField, SaveForm, SelectField } from "components/inputs";
// import Select from "react-select";
// import { InputContainer } from "components/layouts/InputContainer/InputContainer";
// import { Label } from "components/layouts/Label/Label";

// Internal

export const OrganizationDetails = () => {
  const [displayName, setDisplayName] = useState("ReactionData");
  const updateTitle = (newTitle) => {
    // updateProjectQuery.mutate({
    //   id: id,
    //   name: newTitle,
    // });
    setDisplayName(newTitle);
  };


  const tags = [
    { value: "Product", label: "Product" },
    { value: "Corporate", label: "Corporate" },
    { value: "Service", label: "Service" },
  ];
//   const languages = [
//     { value: "en", label: "English" },
//     { value: "sp", label: "Español" },
//     { value: "pt", label: "Português" },
//   ];
  //   const accessGroups = [
  //     { value: "0", label: "No Jeremy" },
  //     { value: "1", label: "Don't let Jeremy see this" },
  //     { value: "2", label: "Confidential: DO NOT SHOW JEREMY" },
  //   ];

  //   const options = (x) =>
  //     x.map((fontSize) => {
  //       return (
  //         <option key={fontSize} value={fontSize}>
  //           {fontSize}
  //         </option>
  //       );
  //     });
  return (
    <div className={styles.page}>
      <SaveForm
        fields={[
          {
            label: "Organization Display Name",
            field: (
              <TextField
                value={displayName}
                placeholder="Survey Name"
                onSave={updateTitle}
              ></TextField>
            ),
          },
          {
            label: "Organization Name",
            field: <span>{displayName}</span>,
          },
          {
            label: "Time Zone",
            field: <SelectField options={tags} selectMultiple></SelectField>,
          },
        ]}
      ></SaveForm>
    </div>
  );
};
