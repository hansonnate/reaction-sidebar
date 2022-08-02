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
  Email,
  SMS,
  Link,
  // Results tab pages
  Visualizations,
  Participations,
  Reports,
} from "pages";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="survey-build" />} />
      <Route path="survey-build/*" element={<SurveyBuild />} />
      <Route path="delivery/*" element={<Delivery />} />
      <Route path="results/*" element={<Results />} />
      <Route path="survey-details" element={<SurveyDetails />} />
    </Routes>
  );
};

export const SurveyBuildRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="questions" />} />
      {/* <Route path="survey-details" element={<SurveyDetails />} /> */}
      <Route path="questions" element={<Questions />} />
      <Route path="design" element={<Design />} />
    </Routes>
  );
};

export const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="distributions" />} />
      <Route path="distributions/*" element={<Distributions />} />
      <Route path="deliveries/*" element={<Deliveries />} />
      {/* <Route path="distributions/email" element={<Email />} />
      <Route path="distributions/link" element={<Link />} />
      <Route path="distributions/sms" element={<SMS />} /> */}
    </Routes>
  );
};

export const DistributionRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="email" />} />
      <Route path="email" element={<Email />} />
      <Route path="link" element={<Link />} />
      <Route path="sms" element={<SMS />} />
    </Routes>
  );
};

export const ResultsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="visualizations" />} />
      <Route path="visualizations" element={<Visualizations />} />
      <Route path="participations" element={<Participations />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};
