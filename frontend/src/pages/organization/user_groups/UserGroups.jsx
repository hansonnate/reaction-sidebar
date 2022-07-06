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
      to: `Roles`,
    },
    {
      id: 1,
      name: "Access Groups",
      to: `AccessGroups`,
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <div className="d-flex flex-col h-100">
      <TabBar
        tabBarItems={tabBarItems}
        active={active}
        updateActive={handleActiveUpdate}
      />
      <>
        <UserGroupsRoutes />
      </>
    </div>
  );
};
