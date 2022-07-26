// External
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Internal
import { Audiences, AllContacts, AddContacts, Manual, Upload } from "pages";

export const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="audiences" />} />
      <Route path="audiences" element={<Audiences />} />
      <Route path="all-contacts/" element={<AllContacts />} />
      <Route path="all-contacts/addContacts/*" element={<AddContacts />} />
    </Routes>
  );
};

export const AddContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="uploadcontacts"/>} />
      <Route path="manual" element={<Manual />} />
      <Route path="uploadcontacts" element={<Upload />} />
    </Routes>
  );
};
