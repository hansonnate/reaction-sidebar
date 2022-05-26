// External
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Internal
import { Manual, Upload } from 'pages'

export const AddContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="uploadcontacts"/>} />
      <Route path="manual" element={<Manual />} />
      <Route path="uploadcontacts" element={<Upload />} />
    </Routes>
  );
};
