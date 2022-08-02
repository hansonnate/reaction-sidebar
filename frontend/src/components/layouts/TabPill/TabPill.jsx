// External
import React from "react";

// Internal
import styles from "./TabPill.module.scss";
import { TabPillItem } from "./TabPillItem";

export const TabPill = ({ tabBarItems, active, updateActive }) => {
  console.log(tabBarItems);
  return (
    <div className={styles.tabBarContainer}>
      <ul className={styles.tabPill}>
        {tabBarItems.map((tabBarItem) => (
          <TabPillItem
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
    </div>
  );
};
