//import useState hook to create menu collapse state
// import React, { useEffect, useState } from "react";
import React from 'react';
import "./index.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

// Be sure to include styles at some point, probably during your bootstraping

//import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
// } from "react-pro-sidebar";

//import icons from react icons

// import { useNavigate } from 'react-router-dom';
// import FastAPIClient from '../../client';
// import config from '../../config';
// import jwtDecode from "jwt-decode";
// import * as moment from "moment";
// import { FaHeart, FaGem } from "react-icons/fa";

// const client = new FastAPIClient(config);

//import sidebar css from react-pro-sidebar module and our custom css 
// import "react-pro-sidebar/dist/css/styles.css";



const Header = () => {
    //create initial menuCollapse state using useState hook
    // const [menuCollapse, setMenuCollapse] = useState(false)
    // const navigate = useNavigate();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("token")
	// if (tokenString) {
  //       const token = JSON.parse(tokenString)
  //       const decodedAccessToken = jwtDecode(token.access_token)
  //       if(moment.unix(decodedAccessToken.exp).toDate() > new Date()){
  //           setIsLoggedIn(true)
  //       }
  //   }
  // }, [])

  // const handleLogout = () => {
  //   client.logout();
  //   setIsLoggedIn(false)
  //   navigate('/')
  // }

  // const handleLogin = () => {
  //   navigate("/login");
  // }

  // let displayButton;
  // const buttonStyle = "button"

  // if (isLoggedIn) {
  //     displayButton = <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>;
  //   } else {
  //     displayButton = <button className={buttonStyle} onClick={() => handleLogin()}>Login</button>;
  //   }

  return (
    
      <div className="header" style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#2A627C">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
             Sidebar
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/login" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                <CDBSidebarMenuItem icon="table">Login</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/profile" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/analytics" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink>

              <NavLink to="/hero404" target="_blank" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
  );
};

export default Header;