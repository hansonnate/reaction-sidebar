import React from "react";
import styles from "./UGSidebar.module.scss";
import { MenuItem } from "./MenuItem";

export const UGSidebar = ({ menuItems, active, updateActive, type, onNewClick }) => {
  return (
    <ul className={styles.menu}>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          id={menuItem.id}
          label={menuItem.name}
          condensed
          isActive={active==menuItem.id}
          makeActive={(id) => {updateActive(id)}}
          description={menuItem.description}
        />
      ))}
      <li className={styles.addRole} onClick={onNewClick}><button>+ New {type}</button></li>
    </ul>
  );
};
