// External
import React, { useState } from "react";

// Internal
import { Sidebar2 } from "components/sidebars";
import { Header, SplitHorizontal } from "components/layouts";
import { ContactRoutes } from "routes";
import styles from "./Contacts.module.scss";

export const Contacts = () => {
  const menuItems = [
    {
      id: 0,
      name: "Audiences",
      to: `audiences`,
      iconClassName: "bi bi-people",
    },
    {
      id: 1,
      name: "All Contacts",
      to: `all-contacts`,
      iconClassName: "bi bi-person",
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <Header title={menuItems[active]["name"]} />

      <SplitHorizontal leftShrink divider fullHeight>
        <Sidebar2
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
        />
        <div className={styles.content}>
          <ContactRoutes />
        </div>
      </SplitHorizontal>
    </>
  );
};
