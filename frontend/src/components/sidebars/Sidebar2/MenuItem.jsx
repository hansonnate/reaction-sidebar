import React from "react";
import { Link } from "react-router-dom";
import styles from "./MenuItem.module.scss";

export const MenuItem = ({ name, iconClassName, to, expanded }) => {
  return (
    <li>
      <Link exact to={to} className={`menu-item`}>
        <div className={styles.menuItem}>
          <i className={iconClassName}></i>
          {expanded && <span>{name}</span>}
          {!expanded && <div className={styles.tooltip}>{name}</div>}
        </div>
        
      </Link>
    </li>
  );
};
