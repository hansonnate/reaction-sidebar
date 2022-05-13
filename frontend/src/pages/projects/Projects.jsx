// External
import React from "react";
import { Link } from "react-router-dom";

// Internal
import { Header } from "../../layouts";

export const Projects = () => {
  return (
    <>
      <Header title="Projects" />
      <Link to="survey1">Survey 1</Link>
    </>
  );
};
