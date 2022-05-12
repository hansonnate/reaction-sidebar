import React from "react";
import styles from "./Sidebar2.module.scss";
import { MenuItem } from "./MenuItem";

export const Sidebar2 = ({ menuItems }) => {
  return (
    <ul className={styles.menu}>
      {menuItems.map((menuItem, index) => (
        <MenuItem
          key={index}
          name={menuItem.name}
          exact={menuItem.exact}
          to={menuItem.to}
          iconClassName={menuItem.iconClassName}
        />
      ))}
    </ul>
  );
};
