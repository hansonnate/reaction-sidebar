// Externals
import React from "react";
import { Link } from "react-router-dom";

// Internals
import styles from "./MenuItem.module.scss";

export const MenuItem = ({
  id,
  label,
  // sublabel,
  iconClassName,
  to,
  // condensed,
  isActive,
  makeActive,
}) => {
  // const [show, setShow] = useState(false);

  return (
    <li>
      <Link to={to}>
        <div
          className={`${styles.menuItem} ${isActive && styles.activeItem}`}
          // onMouseEnter={() => setShow(true)}
          // onMouseLeave={() => setShow(false)}
          onClick={() => makeActive(id)}
        >
          {iconClassName && <i className={iconClassName}></i>}
  
          <span>{label}</span>
          {/* {!condensed && (
            <div>
              <div className={styles.label}>{label}</div>
              <div className={styles.sublabel}>{sublabel}</div>
            </div>
          )}
          {condensed && show && <div className={styles.tooltip}>{label}</div>} */}
        </div>
      </Link>
    </li>
  );
};
