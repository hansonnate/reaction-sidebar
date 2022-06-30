import React from "react";
// import Normal from './Normal.png';
// import Selected from './Selected.png';
import PropTypes from "prop-types";
import styles from "components/inputs/input_fields/resources/resources.module.scss";
import { styled, Box } from "@material-ui/core";


const IconWrpper = styled(Box)({
  "&:hover": {
    backgroundColor: "#eeeeee",
  },

  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Italic = (props) => {
  const { selected } = props;
  return (
    <div
      className={styles.icons}
    >
      <IconWrpper>
        <i
          className="bi bi-type-italic"
          style={
            selected
              ? { color: "#2a627c", fontSize: "1em" }
              : { color: "#A3A4A8", fontSize: "1em" }
          }
        />
      </IconWrpper>
      <div className={styles.hovercontent}>
        Italic
      </div>
    </div>
    
  );
};

Italic.defaultProps = {
  color: "#757575",
};

Italic.propTypes = {
  color: PropTypes.string,
};

export default Italic;
