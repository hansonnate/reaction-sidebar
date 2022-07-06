// External
import React from "react";
// import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
// import { SplitHorizontal } from "components/layouts";
// import { TextField } from "components/inputs";
import styles from "./Role.module.scss";
// import { InputContainer } from "components/layouts/InputContainer/InputContainer";
// import { Label } from "components/layouts/Label/Label";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
// import { useNavigate } from "react-router-dom";

// Internal

export const Role = () => {
//   const menuItems = [
//     {
//       id: 0,
//       name: "Admin",
//       to: "admin",
//       description: "Full access",
//       type: "role",
//     },
//     {
//       id: 1,
//       name: "Staff",
//       to: "staff",
//       description: "Limited access",
//       type: "role",
//     },
//     {
//       id: 2,
//       name: "Account Manager",
//       to: "accountmanager",
//       description: "Regular access",
//       type: "role",
//     },
//   ];
  const permissions = [
    {
      name: "Projects",
      createSurvey: false,
      seeAllSurveys: false,
      sendFromOrgEmail: false,
      sendSurvey: false,
      seeSurveysWhere: false,
      seeSurveyResults: false,
    },
    {
      name: "Contacts",
      createContactsForTeam: false,
      editContacts: false,
      createAudience: false,
    },
    {
      name: "Organization",
      createContactsForTeam: false,
      editContacts: false,
      createAudience: false,
    },
    {
      name: "Distribution",
      createContactsForTeam: false,
      editContacts: false,
      createAudience: false,
    },
  ];



  // let navigate = useNavigate();
  // const routeChange = (path) => {
  //   // console.log(path);
  //   navigate(path);
  // };

  return (
    <>

        <div className={styles.page}>
          {/* <div className={styles.container}> */}
            {/* <InputContainer>
              <Label>Name</Label>
              <TextField
                placeholder="Role Name"
                value={currRole.name}
                onSave={handleSetName}
              ></TextField>
            </InputContainer>
            <InputContainer>
              <Label>Description</Label>
              <TextField
                placeholder="Role Name"
                value={currRole.description}
                onSave={handleSetName}
              ></TextField>
            </InputContainer> */}
            <Form>
              <input
                name="name"
                label="Name"
                type="text"
                placeholder="type here..."
                value={"Yeet"}
              ></input>
              <input
                name="description"
                label="Description"
                type="text"
                placeholder="type here..."
                value={"Skirrt"}
              ></input>
            </Form>

          <UGAccordion data={permissions}></UGAccordion>
        </div>
    </>
  );
};