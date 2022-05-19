import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = ({ title, backPath }) => {
  return (
    <div className={styles.header}>
      {backPath && (
        <Link to={backPath}>
          <i className="bi bi-arrow-left"></i>
        </Link>
      )}
      <h1>{title}</h1>
    </div>
  );
};
