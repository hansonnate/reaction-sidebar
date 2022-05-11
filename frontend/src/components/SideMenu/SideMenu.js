import React, { useEffect, useState } from "react";
import largelogo from "../../images/reactionlogolight.png";
import smalllogo from "../../images/circlelogo.png";
import user from "../../images/manlooking.png";
// import idashboard from "../../icons/1x/speedometer-white.png";
import MenuItem from "./MenuItem";
import "./sidemenu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/login",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Projects",
    exact: true,
    to: `/`,
    iconClassName: "bi bi-folder2",
    // subMenus: [
    //   { name: "Delivery", to: "/projects/courses" },
    //   { name: "Survey Build", to: "/projects/videos" },
    //   { name: "Results", to: "/projects/videos" },
    // ],
  },
  { 
    name: "Contacts", 
    to: `/`, 
    iconClassName: "bi bi-person" 
  },
  {
    name: "Organization",
    exact: true,
    to: `/`,
    iconClassName: "bi bi-building",
  },
  {
    name: "Help",
    exact: true,
    to: `/`,
    iconClassName: "bi bi-question-circle",
  },
];

const SideMenu = (props) => {
  
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        console.log(e);
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : "active"}`}>
      <div className="top-section">
        <div className={`logo ${inactive ? "small-logo" : "large-logo"}`}>
          <img src={inactive ? smalllogo : largelogo } alt="ReactionData" />
        </div>
      </div>

      {/* <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div> */}

      {/* <div className="divider"></div> */}

      <div className={`main-menu ${inactive ? "closed-menu" : "open-menu"}`}>
        <ul className={`list ${inactive ? "closed-menu" : "open-menu"}`}>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                console.log(e);
                if (inactive) {
                  setInactive(true);
                }
              }}
            />
          ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>

      <div className={`side-menu-footer ${inactive ? "closed" : "open"}`}>
        <div className={`user-container ${inactive ? "closed" : "open"}`}>
          <div className="avatar">
            <img src={user} alt="user" onClick={() => setInactive(!inactive)}/>
          </div>
          <div className="user-info">
            <h5>Jeremy Bikman</h5>
            <p>Reaction</p>
          </div>
        </div>
        <div onClick={() => setInactive(!inactive)} className={`toggle-menu-btn ${inactive ? "closed" : "open"}`}>
          {inactive ? (
            <i className="bi bi-arrow-bar-right"></i>
          ) : (
            <i className="bi bi-arrow-bar-left"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
