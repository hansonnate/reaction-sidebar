// External
import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Internal
import { SideMenu } from "components/sidebars";
import { SplitHorizontal } from "components/layouts";
import { MainContentRoutes } from "routes";
import { Loading } from "./components/Loading/Loading";

const queryClient = new QueryClient();

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {loading && (
          <Loading
            fullScreen
            message="Hang tight. We're getting things ready for you."
          />
        )}
        <div className={`${styles.App} bg-white`}>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap"
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
