// External
import React, { useState } from "react";

// Internal
// import { Sidebar2 } from "components/sidebars";
import { Header, TabBar } from "components/layouts";
import { AddContactRoutes } from "routes";
// import { ContactRoutes } from "routes";
import styles from "./AddContacts.module.scss";

export const AddContacts = () => {
  const menuItems = [
    {
      id: 0,
      name: "Import From File",
      to: `uploadcontacts`,
      iconClassName: "bi bi-person",
    },
    {
      id: 1,
      name: "Enter Manually",
      to: `manual`,
      iconClassName: "bi bi-people",
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <div className={styles.body}>
      <Header title={menuItems[active]["name"]} />

      <TabBar
        tabBarItems={menuItems}
        active={active}
        updateActive={handleActiveUpdate}
      ></TabBar>
      <div className={styles.content}>
        <AddContactRoutes />
      </div>
    </div>
  );
};
