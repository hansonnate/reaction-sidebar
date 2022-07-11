// Externals
import React from "react";
// import { Link } from "react-router-dom";

// Internals
import styles from "./MenuItem.module.scss";

export const MenuItem = ({
  id,
  label,
  // sublabel,
  // to,
  description,
  // condensed,
  isActive,
  makeActive,
}) => {
  // const [show, setShow] = useState(false);

  return (
    <li>
      {/* <Link to={to}> */}

        <div
          className={`${styles.menuItem} ${isActive && styles.activeItem}`}
          // onMouseEnter={() => setShow(true)}
          // onMouseLeave={() => setShow(false)}
          onClick={() => makeActive(id)}
        >
          <span>{label}</span>
          <span className={styles.description}>{description}</span>
        </div>

      {/* </Link> */}
    </li>
  );
};
