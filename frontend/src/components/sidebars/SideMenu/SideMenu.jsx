import React, { useState } from "react";
import largelogo from "assets/images/reactionlogolight.png";
import smalllogo from "assets/images/circlelogo.png";
import user from "assets/images/manlooking.png";
import styles from "./SideMenu.module.scss";
// import idashboard from "../../icons/1x/speedometer-white.png";
import MenuItem from "./MenuItem";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * @author Nate Hanson
 * @function SideMenu
 **/

// added more menuItems for testing
export const items = [
  {
    id: 0,
    name: "Dashboard",
    to: "/",
    iconClassName: "bi bi-speedometer2",
  },
  {
    id: 1,
    name: "Projects",
    to: `/projects`,
    iconClassName: "bi bi-folder2",
    // subMenus: [
    //   { name: "Delivery", to: "/projects/courses" },
    //   { name: "Survey Build", to: "/projects/videos" },
    //   { name: "Results", to: "/projects/videos" },
    // ],
  },
  {
    id: 2,
    name: "Contacts",
    to: `/contacts`,
    iconClassName: "bi bi-person",
  },
  {
    id: 3,
    name: "Organization",
    to: `/organization`,
    iconClassName: "bi bi-building",
  },
  {
    id: 4,
    name: "Notifications",
    to: `/notifications`,
    iconClassName: "bi bi-bell",
  },
  {
    id: 5,
    name: "Help",
    to: `/help`,
    iconClassName: "bi bi-question-circle",
  },
];

export const SideMenu = () => {
  const [collapsed, collapse] = useState(
    localStorage.getItem("sidemenustate") === "collapsed"
  );
  // const [menuItems, setMenuItems] = useState(items);
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activepage")
  );
  // localStorage.setItem("sidebarstate", "collapsed");

  function handleMenuItemClick(id) {
    localStorage.setItem("activepage", id);
    setActiveItem(id);
    console.log(items);
  }

  function handleToggleExpand() {
    if (collapsed) {
      localStorage.setItem("sidemenustate", "expanded");
    } else {
      localStorage.setItem("sidemenustate", "collapsed");
    }
    collapse(!collapsed);
  }

  return (
    <div
      className={`${styles.sideMenu} ${
        collapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <div
        className={`${styles.logo} ${
          collapsed ? styles.smallLogo : styles.largeLogo
        }`}
        onClick={handleToggleExpand}
      >
        <img src={collapsed ? smalllogo : largelogo} alt="ReactionData" />

        {collapsed ? (
          <i className="bi bi-chevron-right"></i>
        ) : (
          <i className="bi bi-chevron-left"></i>
        )}
      </div>
      <div
        className={`${styles.mainMenu} ${
          collapsed ? styles.closedMenu : styles.openMenu
        }`}
      >
        <div
          className={`${styles.topItems} ${
            collapsed ? styles.closedMenu : styles.openMenu
          }`}
        >
          {items.slice(0, 4).map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              active={activeItem == menuItem.id}
              onClick={handleMenuItemClick}
            />
          ))}
        </div>
        <div
          className={`${styles.bottomItems} ${
            collapsed ? styles.closedMenu : styles.openMenu
          }`}
        >
          {items.slice(4, 6).map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              active={activeItem == menuItem.id}
              onClick={handleMenuItemClick}
            />
          ))}
        </div>
      </div>
      <hr className={styles.breakLine}></hr>
      <div
        className={`${styles.userContainer} ${
          collapsed ? styles.closed : styles.open
        }`}
      >
        <div className={styles.avatar}>
          <img src={user} alt="user" onClick={handleToggleExpand} />
        </div>
        <div className={styles.userInfo}>
          <span>Jeremy Bikman</span>
        </div>
      </div>
    </div>
  );
};
