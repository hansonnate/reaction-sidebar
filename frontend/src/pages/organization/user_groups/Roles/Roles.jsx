// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Roles.module.scss";
// import { InputContainer } from "components/layouts/InputContainer/InputContainer";
// import { Label } from "components/layouts/Label/Label";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
// import { useNavigate } from "react-router-dom";

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

  const [currRole, setCurrRole] = useState(menuItems[1]);
  const [items, setItems] = useState(menuItems);
  const [active, setActive] = useState(1);
  const handleActiveUpdate = (i) => {
    setActive(i);
    setCurrRole(items[i]);
  };
  console.log(currRole);

  const handleNewRole = () => {
    
    setItems([...items, {id: items.length, name: "New Role", to: "New Description", description: "New Description", type: "role"}]);
    console.log(items);
  }

  const onSave = (name, description) => {
    let array = items;
    for (let i = 0; i < array.length; i++) {
      if(array[i].id === currRole.id) {
        array[i].name = name;
        array[i].description = description;
      }
    }
    setItems(array);
    console.log(items);
  }

  return (
    
      <SplitHorizontal className="flex-grow" leftShrink divider fullHeight>
        <UGSidebar
          menuItems={items}
          active={active}
          updateActive={handleActiveUpdate}
          onNewClick={handleNewRole}
          type="Role"
        />
        <div className={`flex-grow-1 ${styles.page}`}>
          <Form onSave={onSave}>
            <TextField
              name="name"
              label="Name"
              type="text"
              placeholder="type here..."
              value={currRole.name}
            ></TextField>
            <TextField
              name="description"
              label="Description"
              type="text"
              placeholder="type here..."
              value={currRole.description}
            ></TextField>
          </Form>

          <UGAccordion data={permissions}></UGAccordion>
        </div>
      </SplitHorizontal>
    
  );
};
