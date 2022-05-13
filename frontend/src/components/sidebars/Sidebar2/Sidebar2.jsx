import React from "react";
import styles from "./Sidebar2.module.scss";
import { MenuItem } from "./MenuItem";

export const Sidebar2 = ({ menuItems, active, updateActive }) => {
  return (
    <ul className={styles.menu}>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          id={menuItem.id}
          label={menuItem.name}
          to={menuItem.to}
          iconClassName={menuItem.iconClassName}
          condensed
          isActive={active==menuItem.id}
          makeActive={(index) => {updateActive(index)}}
        />
      ))}
    </ul>
  );
};
