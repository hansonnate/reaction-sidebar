// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Roles.module.scss";
import { InputContainer } from "components/layouts/InputContainer/InputContainer";
import { Label } from "components/layouts/Label/Label";
import { UGAccordion } from "components/UGAccordion/UGAccordion";

// Internal

export const Roles = () => {
  const menuItems = [
    {
      id: 0,
      name: "Admin",
      to: "admin",
      description: "Full access",
      type: "role",
    },
    {
      id: 1,
      name: "Staff",
      to: "staff",
      description: "Limited access",
      type: "role",
    },
    {
      id: 2,
      name: "Account Manager",
      to: "accountmanager",
      description: "Regular access",
      type: "role",
    },
  ];
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

  const [currRole, setCurrRole] = useState(menuItems[0]);
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  const handleSetCurrRole = (role) => {
    setCurrRole(role);
  };
  const handleSetName = (name) => {
    currRole.name = name;
    console.log(currRole);
  };

  return (
    <>
      <SplitHorizontal leftShrink divider fullHeight>
        <UGSidebar
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
          updateCurrRole={handleSetCurrRole}
          type="Role"
        />
        <div className={styles.page}>
          <div className={styles.container}>
            <InputContainer>
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
            </InputContainer>
          </div>
          <UGAccordion data={permissions}></UGAccordion>
        </div>
      </SplitHorizontal>
    </>
  );
};
