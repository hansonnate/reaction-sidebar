// External
import React, { useState } from "react";
import { DeliverySidebar } from "components/sidebars/DeliverySidebar/DeliverySidebar.jsx";
import { SplitHorizontal } from "components/layouts";
import { DistributionRoutes } from "routes";
// Internal

export const Distributions = () => {
  const menuItems = [
    {
      id: 0,
      name: "Email",
      to: `email`,
      iconClassName: "bi bi-envelope",
    },
    {
      id: 1,
      name: "SMS",
      to: `sms`,
      iconClassName: "bi bi-phone",
    },
    {
      id: 2,
      name: "Link",
      to: `link`,
      iconClassName: "bi bi-link",
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <SplitHorizontal leftShrink divider fullHeight>
        <DeliverySidebar
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
        />
        <DistributionRoutes />
      </SplitHorizontal>
    </>
  );
};
