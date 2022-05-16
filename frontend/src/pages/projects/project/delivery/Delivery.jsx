// External
import React, { useState } from "react";

// Internal
import { TabBar } from "components/layouts";
import { DeliveryRoutes } from "routes";

export const Delivery = () => {
  const tabBarItems = [
    {
      id: 0,
      name: "Distributions",
      to: `distributions`,
    },
    {
      id: 1,
      name: "Deliveries",
      to: `deliveries`,
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
      <DeliveryRoutes />
    </>
  );
};
