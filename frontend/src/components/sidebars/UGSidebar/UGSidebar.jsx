import React from "react";
import styles from "./UGSidebar.module.scss";
import { MenuItem } from "./MenuItem";

export const UGSidebar = ({ menuItems, active, updateActive, type }) => {
  return (
    <ul className={styles.menu}>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          id={menuItem.id}
          label={menuItem.name}
          to={menuItem.to}
          condensed
          isActive={active==menuItem.id}
          makeActive={(index) => {updateActive(index)}}
          description={menuItem.description}
        />
      ))}
      <li className={styles.addRole}><button>+ New {type}</button></li>
    </ul>
  );
};
