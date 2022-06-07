import React from "react";
import { useApi } from "api";
import * as Api from "api";

export const AutoSave = ({ children }) => {
  let autoSaveTimer = null;

  const saveUpdatesLocal = (api, updates) => {
    const apiString = JSON.stringify(api);
    if (localStorage.getItem(apiString)) {
      let local = JSON.parse(localStorage.getItem(apiString));
      console.log(local);
      local = { ...local, ...updates };
      localStorage.setItem(apiString, JSON.stringify(local));
    } else {
      localStorage.setItem(apiString, JSON.stringify(updates));
    }
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveRemote, 7000);
  };

  const saveRemote = () => {
    console.log("saving remote");
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let resource = JSON.parse(key).resource;
      let method = JSON.parse(key).method;
      let apiMethod = useApi(Api[resource][method]);
      apiMethod.request(0, JSON.parse(localStorage.getItem(key)));
    }

    return <>{children}</>;
  };
};
