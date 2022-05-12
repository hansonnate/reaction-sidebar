import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Header = ({ title, backPath }) => {
  return (
    <>
      {backPath && <i className="bi bi-arrow-left"></i>}
      <h1>{title}</h1>
    </>
  );
};
