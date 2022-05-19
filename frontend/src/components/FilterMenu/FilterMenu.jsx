import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterMenu.module.scss";

// function useComponentVisible(initialIsVisible) {
//   const [isComponentVisible, setIsComponentVisible] =
//     useState(initialIsVisible);
//   const ref = useRef(null);

//   const handleClickOutside = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setIsComponentVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   }, []);

//   return { ref, isComponentVisible, setIsComponentVisible };
// }

function FilterMenu(props) {
  //   const ref = useRef();
     const [open, setOpen] = useState(false);
  //   useEffect(() => {
  //     const checkIfClickedOutside = (e) => {
  //       // If the menu is open and the clicked target is not within the menu,
  //       // then close the menu
  //       if (open && ref.current && !ref.current.contains(e.target)) {
  //         setOpen(true);
  //       }
  //     };

  //     document.addEventListener("mousedown", checkIfClickedOutside);

  //     return () => {
  //       // Cleanup the event listener
  //       document.removeEventListener("mousedown", checkIfClickedOutside);
  //     };
  //   }, [open]);

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
    <div className={`${styles.filtermenu} ${open ? styles.filtermenuactive : ""}`} ref={ref}>
      <a onClick={() => setOpen((open) => !open)}>
        <i className="bi bi-sliders"></i>
      </a>
      {open && props.children}
    </div>
  );
}
export default FilterMenu;
