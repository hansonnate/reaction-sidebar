import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  // Project pages
  SurveyBuild,
  Delivery,
  Results,
  // Survey Build tab pages
  SurveyDetails,
  Questions,
  Design,
  // Delivery tab pages
  Distributions,
  Deliveries,
  // Results tab pages
  Vizualizations,
  Participations,
  Reports,
} from "pages";

export const ProjectRoutes = ({ project }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="survey-build" />} />
      <Route
        path="survey-build/*"
        element={<SurveyBuild project={project} />}
      />
      <Route path="delivery/*" element={<Delivery project={project} />} />
      <Route path="results/*" element={<Results project={project} />} />
    </Routes>
  );
};

export const SurveyBuildRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="survey-details" />} />
      <Route path="survey-details" element={<SurveyDetails />} />
      <Route path="questions" element={<Questions />} />
      <Route path="design" element={<Design />} />
    </Routes>
  );
};

export const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="distributions" />} />
      <Route path="distributions" element={<Distributions />} />
      <Route path="deliveries" element={<Deliveries />} />
    </Routes>
  );
};

export const ResultsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="vizualizations" />} />
      <Route path="vizualizations" element={<Vizualizations />} />
      <Route path="participations" element={<Participations />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};
