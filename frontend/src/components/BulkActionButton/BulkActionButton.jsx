import React, {useState, useRef, useEffect} from "react";
import styles from "./BulkActionButton.module.scss";


function BulkActionButton(props) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      }, []);
      
  return (
    <div className={`${styles.mainbutton} ${open ? styles.mainbuttonactive : ""}`} ref={ref}>
      <button onClick={() => setOpen((open) => !open)}>
        Actions
        <i className="bi bi-chevron-down"></i>
      </button>
      {open && props.children}
    </div>
  );
}

export default BulkActionButton;
