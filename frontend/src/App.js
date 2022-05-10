import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import Home from './pages/home';
import RecipeDashboard from './pages/my-recipes';
import ErrorPage from './pages/error-page';
// import SideMenu, { menuItems } from "./components/SideMenu/SideMenu.js";
// import { useState } from "react";

const App = () => {
  // const [inactive, setInactive] = useState(false);
  return (
    <div className="App bg-black">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap" rel="stylesheet"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/my-recipes" element={<RecipeDashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact={true} path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap" rel="stylesheet"/>
      <BrowserRouter>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />
          {/* <SubMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        /> */}

        {/* <div className={`container ${inactive ? "inactive" : ""}`}>
          {menuItems.map((menu) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}>
                <h1>{menu.name}</h1>
              </Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu) => (
                    <Route key={subMenu.name} path={subMenu.to}>
                      <h1>{subMenu.name}</h1>
                    </Route>
                  ))
                : null}
            </>
          ))}
        </div>
      </BrowserRouter> */}
    </div>
  );
};

export default App;
