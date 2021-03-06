// External
import React, { useState } from "react";
import { TabBar } from "components/layouts";
import { UserGroupsRoutes } from "routes";

// Internal

export const UserGroups = () => {
  const tabBarItems = [
    {
      id: 0,
      name: "Roles",
      to: `roles`,
    },
    {
      id: 1,
      name: "Teams",
      to: `teams`,
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <TabBar
        tabBarItems={tabBarItems}
        active={active}
        updateActive={handleActiveUpdate}
      />
      <>
        <UserGroupsRoutes />
      </>
    </>
  );
};
