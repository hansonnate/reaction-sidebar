// External
import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./routes.module.scss";

// Internal
import {
  Dashboard,
  Projects,
  Project,
  Contacts,
  Organization,
  Help,
  Account,
  ErrorPage,
  AddContacts,
} from "pages";

export const MainContentRoutes = () => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/*" element={<Project />} />
        <Route path="/contacts/*" element={<Contacts />} />
        <Route path="/organization/*" element={<Organization />} />
        <Route path="/addcontacts/*" element={<AddContacts />} />

        <Route path="/help/*" element={<Help />} />
        <Route path="/account/*" element={<Account />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
