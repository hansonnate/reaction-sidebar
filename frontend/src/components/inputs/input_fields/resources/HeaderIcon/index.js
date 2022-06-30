import React from "react";
import PropTypes from "prop-types";
import { styled, Box } from "@material-ui/core";
import styles from "components/inputs/input_fields/resources/resources.module.scss";

const IconWrpper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Header = (props) => {
  const { selected, type } = props;
  function checktype() {
    switch (type) {
      case "header-one":
        return (
          <h1 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 1
          </h1>
        );
      case "header-two":
        return (
          <h2 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 2
          </h2>
        );
      case "header-three":
        return (
          <h3 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 3
          </h3>
        );
      case "header-four":
        return (
          <h4 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 4
          </h4>
        );
      case "header-five":
        return (
          <h5 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 5
          </h5>
        );
      case "header-six":
        return (
          <h6 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            Header 6
          </h6>
        );
      default:
        return (
          <h1 style={selected ? { color: "#2a627c" } : { color: "#A3A4A8" }}>
            
            Header 1
          </h1>
        );
    }
  }
  return (
    <div className={styles.icons}>
      <IconWrpper>{checktype}</IconWrpper>
    </div>
  );
};

Header.defaultProps = {
  color: "#757575",
};

Header.propTypes = {
  color: PropTypes.string,
};

export default Header;
