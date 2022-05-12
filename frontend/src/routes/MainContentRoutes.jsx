import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Projects,
  Contacts,
  Organization,
  Help,
  Account,
  Login,
  SignUp,
  ErrorPage,
} from "../pages";

export const MainContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route exact path="/projects" element={<Projects />} />
      <Route exact path="/contacts" element={<Contacts />} />
      <Route exact path="/organization" element={<Organization />} />

      <Route exact path="/help" element={<Help />} />
      <Route exact path="/account" element={<Account />} />

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact={true} path="*" element={<ErrorPage />} />
    </Routes>
  );
};
