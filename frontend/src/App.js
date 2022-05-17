// External
import React from "react";
import styles from "./App.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";

// Internal
import { SideMenu } from "components/sidebars";
import { SplitHorizontal } from "layouts";
import { MainContentRoutes } from "routes";

const App = () => {
  return (
    <div className={`${styles.App} bg-white`}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <BrowserRouter>
        <SplitHorizontal leftShrink fullHeight>
          <SideMenu onCollapse={() => {}} />
          <div className={styles.mainContent}>
            <MainContentRoutes />
          </div>
        </SplitHorizontal>
      </BrowserRouter>
    </div>
  );
};

export default App;
