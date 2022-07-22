import React, { useState, useRef, useEffect } from "react";
// import { TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";

import styles from "./SearchField.module.scss";
import { useSearchUserGql } from "api/resources/organization/users";

export const SearchField = ({
  value,
  placeholder,
  // label,
  onChange,
  disabled,
  org_id,
  onRowClick,
  searchType,
  // inactive,
  // align = "left",
  // customStyles,
}) => {
  const [val, setVal] = useState(value);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const searchUser = useSearchUserGql(org_id, val);
  const ref = useRef(null);

  const handleChange = (event) => {
    setVal(event.target.value);
    
    // searchUser(org_id, event.target.value);
    if (searchType === "user") {
      setShowOptions(true);
      searchUser.refetch();
      // console.log(searchUser);
      if (searchUser.data.allUsers.length > 0) {
        setOptions(searchUser.data.allUsers);
      }
    }
    // console.log(options);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleRowClick = (row) => {
    // alert("You clicked on: " + user.firstname)
    onRowClick(row);
    setShowOptions(false);
    setVal("");
  };

  return (
    <>
      <input
        disabled={disabled}
        className={styles.textfield}
        value={val}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
      ></input>
      {showOptions && searchType === "user" && (
        <div className={styles.dropdown} ref={ref}>
          <div className={`${styles.header}`}>
            <span>User</span>
            <span>Position</span>
            <span>Company</span>
          </div>
          {options.map((user) => (
            <div
              key={user.firstname}
              className={styles.userbox}
              onClick={() => handleRowClick(user)}
            >
              <span>
                <div>
                  {user.firstname} {user.lastname}
                </div>
                <div className={styles.addon}>{user.email}</div>
              </span>
              <span>{user.position}</span>
              <span>{user.company}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
