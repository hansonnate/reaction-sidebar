// Externals
import React from "react";
import { Link } from "react-router-dom";

// Internals
import styles from "./TabBarItem.module.scss";

export const TabBarItem = ({ id, label, to, isActive, makeActive }) => {
  return (
    <li>
      <Link to={to}>
        <div
          className={`${styles.tabBarItem} ${isActive && styles.activeItem}`}
          onClick={() => makeActive(id)}
        >
          {label}
        </div>
      </Link>
    </li>
  );
};
