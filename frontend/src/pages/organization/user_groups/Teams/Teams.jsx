// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Teams.module.scss";
import { InputContainer } from "components/layouts/InputContainer/InputContainer";
import { Label } from "components/layouts/Label/Label";

// Internal

export const Teams = () => {
  const menuItems = [
    {
      id: 0,
      name: "No Jeremy",
      to: "nojeremy",
      description: "Jeremy shall be excluded",
      type: "team",
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
          type="Team"
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
        </div>
      </SplitHorizontal>
    </>
  );
};
