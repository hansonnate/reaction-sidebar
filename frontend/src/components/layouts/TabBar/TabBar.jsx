// External
import React from "react";

// Internal
import styles from "./TabBar.module.scss";
import { TabBarItem } from "./TabBarItem";

export const TabBar = ({ tabBarItems, active, updateActive }) => {
  return (
    <div>
      <ul className={styles.tabBar}>
        {tabBarItems.map((tabBarItem) => (
          <TabBarItem
            key={tabBarItem.id}
            id={tabBarItem.id}
            label={tabBarItem.name}
            to={tabBarItem.to}
            isActive={active == tabBarItem.id}
            makeActive={(index) => {
              updateActive(index);
            }}
          />
        ))}
      </ul>
      <hr/>
    </div>
  );
};
