import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./SideMenu.module.scss";

/**
 * @author Nate Hanson
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { onClick, name, subMenus, iconClassName, to, active, menuItem } =
    props;
  // const [expand, setExpand] = useState(false);
  // const [isActive, setActive] = useState(localStorage.getItem("activepage") === name);

  function handleClick() {
    // setActive(true);
    onClick(menuItem.id);
  }
  console.log(active);
  return (
    <div
      onClick={handleClick}
      className={`${styles.menuItem} ${active ? styles.active : ""}`}
    >
      <Link
        to={to}
        // onClick={() => {
        //   setExpand((e) => !e);
        // }}
      >
        <div className={styles.menuItemBox}>
          <div className={styles.menuIcon}>
            <i className={iconClassName}></i>
          </div>
          <div className={styles.menuItemName}>
            <span>{name}</span>
          </div>
        </div>
      </Link>
      {subMenus && subMenus.length > 0 ? (
        <ul className={styles.subMenu}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to}>{menu.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MenuItem;
