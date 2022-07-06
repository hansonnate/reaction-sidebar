//import useState hook to create menu collapse state
import React, { useEffect, useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import mainLogo from'assets/images/reactionlogolight.png';
import smallLogo from'assets/images/circlelogo.png';
import { useNavigate } from 'react-router-dom';
import FastAPIClient from '../../client';
import config from '../../config';
import jwtDecode from "jwt-decode";
import * as moment from "moment";

const client = new FastAPIClient(config);

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";


export const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  useEffect(() => {
    const tokenString = localStorage.getItem("token")
	if (tokenString) {
        const token = JSON.parse(tokenString)
        const decodedAccessToken = jwtDecode(token.access_token)
        if(moment.unix(decodedAccessToken.exp).toDate() > new Date()){
            setIsLoggedIn(true)
        }
    }
  }, [])

  const handleLogout = () => {
    client.logout();
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleLogin = () => {
    navigate("/login");
  }

  let displayButton;
  const buttonStyle = "button"

  if (isLoggedIn) {
      displayButton = <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>;
    } else {
      displayButton = <button className={buttonStyle} onClick={() => handleLogin()}>Login</button>;
    }

  return (
    <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
    <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
        <div className="logotext">
            {/* small and big change using menucollapse state */}
            <p>{menuCollapse ? <img width="200" src={smallLogo}/> : <img width="200" src={mainLogo}/> }</p>
        </div>
        
        </SidebarHeader>
        <SidebarContent>
        <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
            Home
            </MenuItem>
            <a href=""><MenuItem icon={<FaList />}>Category</MenuItem></a>
            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>
            
            {!isLoggedIn && <MenuItem
                className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white"
                to={`/sign-up`}>
                Create Account
            </MenuItem>}
        </Menu>
        </SidebarContent>
        <SidebarFooter>
        <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>{displayButton}</MenuItem>
            <div className="closemenu" onClick={menuIconClick}>
            {/* changing menu collapse icon on click */}
            {menuCollapse ? (
            <FiArrowRightCircle/>
            ) : (
            <FiArrowLeftCircle/>
            )}
        </div>
        </Menu>
        </SidebarFooter>
    </ProSidebar>
    </div>
  );
};

export default Header;