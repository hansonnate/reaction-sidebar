import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
//import { useState } from "react";
import { SideMenu } from "./components/sidebars";
import { SplitHorizontal } from "./layouts";
import { MainContentRoutes } from "./routes/MainContentRoutes";

const App = () => {
  return (
    <div className="App bg-white">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap"
        rel="stylesheet"
      />

      <BrowserRouter>
        <SplitHorizontal leftShrink fullHeight>
          <SideMenu
            onCollapse={(inactive) => {
              console.log(inactive);
            }}
          />
          <MainContentRoutes />
        </SplitHorizontal>
      </BrowserRouter>
    </div>
  );
};

export default App;
