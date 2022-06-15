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

const Headings = (props) => {
  const { selected } = props;
  return (
    <div className={styles.icons}>
      <IconWrpper>
        <i
          className="bi bi-filetype-html"
          style={
            selected
              ? { color: "#2a627c", fontSize: "1em" }
              : { color: "#A3A4A8", fontSize: "1em" }
          }
        />
      </IconWrpper>
      {selected ? null : <div className={styles.hovercontent}>View html</div>}
    </div>
  );
};

Headings.defaultProps = {
  color: "#757575",
};

Headings.propTypes = {
  color: PropTypes.string,
};

export default Headings;
