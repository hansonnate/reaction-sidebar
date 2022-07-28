// External
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Internal
import { Audiences, AllContacts, AddContacts, Manual, Upload, ImportedCleaner, PreviousImports } from "pages";

export const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="audiences" />} />
      <Route path="audiences" element={<Audiences />} />
      <Route path="all-contacts/" element={<AllContacts />} />
      <Route path="all-contacts/addContacts/*" element={<AddContacts />} />
      <Route path="previous-imports" element={<PreviousImports/>} />
      <Route path="previous-imports/:id" element={<ImportedCleaner />} />
    </Routes>
  );
};

export const AddContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="uploadcontacts"/>} />
      <Route path="manual" element={<Manual />} />
      <Route path="uploadcontacts" element={<Upload />} />
      <Route path=":id" element={<ImportedCleaner />} />
    </Routes>
  );
};
