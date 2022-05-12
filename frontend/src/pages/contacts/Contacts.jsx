import React from "react";
import { Sidebar2 } from "../../components/sidebars";
import { Header, SplitHorizontal } from "../../layouts";

export const Contacts = () => {
  const menuItems = [
    {
      name: "Audiences",
      to: `/contacts`,
      iconClassName: "bi bi-person",
    },
    {
      name: "Contacts",
      to: `/contacts`,
      iconClassName: "bi bi-person",
    },
  ];
  return (
    <>
      <Header title="Contacts" />
      <SplitHorizontal leftShrink divider fullHeight>
        <Sidebar2 menuItems={menuItems} />
        <div>right</div>
      </SplitHorizontal>
    </>
  );
};
