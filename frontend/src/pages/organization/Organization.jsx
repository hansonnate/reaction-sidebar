// External
import React, { useState } from "react";

// Internal
import { Header, SplitHorizontal } from "components/layouts";
import { Sidebar2 } from "components/sidebars";
import { OrganizationRoutes } from "routes";
import styles from "./Organization.module.scss";

export const Organization = () => {
  const menuItems = [
    {
      id: 0,
      name: "Organization Details",
      to: `org-deetz`,
      iconClassName: "bi bi-card-text",
    },
    {
      id: 1,
      name: "Users",
      to: `users`,
      iconClassName: "bi bi-person",
    },
    {
      id: 2,
      name: "User Groups",
      to: `user-groups`,
      iconClassName: "bi bi-diagram-3",
    },
    {
      id: 3,
      name: "Distribution Settings",
      to: `dist-settings`,
      iconClassName: "bi bi-truck",
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <Header title={menuItems[active]["name"]} />
      <SplitHorizontal leftShrink fullHeight divider>
        <Sidebar2
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
        />
        <div className={styles.content}>
          <OrganizationRoutes />
        </div>
      </SplitHorizontal>
    </>
  );
};
