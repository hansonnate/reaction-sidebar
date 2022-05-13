// External
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Internal
import { Audiences, AllContacts } from 'pages'

export const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="audiences"/>} />
      <Route path="audiences" element={<Audiences />} />
      <Route path="all-contacts" element={<AllContacts />} />
    </Routes>
  );
};
