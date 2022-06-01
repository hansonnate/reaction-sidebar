import React, { useEffect, useState } from "react";
// import ContentEditable from "react-contenteditable";
import Relationship from "./Relationship";
import { usePopper } from "react-popper";
import { grey } from "./colors";
import PlusIcon from "./img/Plus";
import { randomColor } from "./utils";
import style from "./Cell.module.scss";

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, options },
  dataDispatch,
}) {
  const [value, setValue] = useState({ value: initialValue, update: false });
  const [selectRef, setSelectRef] = useState(null);
  const [selectPop, setSelectPop] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const onChange = (e) => {
    setValue({ value: e.target.value, update: false });
  };
  const [showAdd, setShowAdd] = useState(false);
  const [addSelectRef, setAddSelectRef] = useState(null);

  useEffect(() => {
    setValue({ value: initialValue, update: false });
  }, [initialValue]);

  useEffect(() => {
    if (value.update) {
      dataDispatch({
        type: "update_cell",
        columnId: id,
        rowIndex: index,
        value: value.value,
      });
    }
  }, [value, dataDispatch, id, index]);

  function handleOptionKeyDown(e) {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        dataDispatch({
          type: "add_option_to_column",
          option: e.target.value,
          backgroundColor: randomColor(),
          columnId: id,
        });
      }
      setShowAdd(false);
    }
  }

  function handleAddOption() {
    setShowAdd(true);
  }

  function handleOptionBlur(e) {
    if (e.target.value !== "") {
      dataDispatch({
        type: "add_option_to_column",
        option: e.target.value,
        backgroundColor: randomColor(),
        columnId: id,
      });
    }
    setShowAdd(false);
  }

  const { styles, attributes } = usePopper(selectRef, selectPop, {
    placement: "bottom-start",
    strategy: "fixed",
  });

  function getColor() {
    let match = options.find((option) => option.label === value.value);
    return (match && match.backgroundColor) || grey(300);
  }

  function empty(value) {
    // console.log(value);
    if (value === "" || value === undefined) {
      console.log(id);
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  let element;
  switch (dataType) {
    case "text":
      element = (
        <input
          value={(value.value && value.value.toString()) || ""}
          onChange={onChange}
          placeholder="type..."
          onBlur={() => setValue((old) => ({ value: old.value, update: true }))}
          // className={style.data_input}
          className={`${style.data_input} ${
            empty(value.value) ? style.empty_input : ""
          }`}
        ></input>
      );
      break;
    case "number":
      element = (
        <input
          value={(value.value && value.value.toString()) || ""}
          onChange={onChange}
          placeholder="type..."
          onBlur={() => setValue((old) => ({ value: old.value, update: true }))}
          // className={style.data_input}
          className={`${style.data_input} ${style.text_align_right} ${
            empty(value.value) ? style.empty_input : ""
          }`}
        />
      );
      break;
    case "select":
      element = (
        <>
          <div
            ref={setSelectRef}
            className={`${style.selectcell} ${
              empty(value.value) ? style.selectcell_empty : ""
            }`}
            onClick={() => setShowSelect(true)}
          >
            {value.value && (
              <Relationship value={value.value} backgroundColor={getColor()} />
            )}
            {empty(value.value) ? (
              <span className={`${style.svg_icon_sm} ${style.svg_text}`}>
                <PlusIcon />
              </span>
            ) : (
              ""
            )}
          </div>
          {showSelect && (
            <div className="overlay" onClick={() => setShowSelect(false)} />
          )}
          {showSelect && (
            <div
              className={style.selectpop}
              ref={setSelectPop}
              {...attributes.popper}
              style={{
                ...styles.popper,
                zIndex: 4,
                minWidth: 200,
                maxWidth: 320,
                padding: "0.75rem",
              }}
            >
              <div
                className={`${style.d_flex} ${style.flex_wrap_wrap}`}
                style={{ marginTop: "-0.5rem" }}
              >
                {options.map((option) => (
                  <div
                    key={option.label}
                    className={style.cursor_pointer}
                    style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                    onClick={() => {
                      setValue({ value: option.label, update: true });
                      setShowSelect(false);
                    }}
                  >
                    <Relationship
                      value={option.label}
                      backgroundColor={option.backgroundColor}
                    />
                  </div>
                ))}
                {showAdd && (
                  <div
                    style={{
                      marginRight: "0.5rem",
                      marginTop: "0.5rem",
                      width: 120,
                      padding: "2px 4px",
                      backgroundColor: grey(200),
                      borderRadius: 4,
                    }}
                  >
                    <input
                      type="text"
                      className={style.option_input}
                      onBlur={handleOptionBlur}
                      ref={setAddSelectRef}
                      onKeyDown={handleOptionKeyDown}
                    />
                  </div>
                )}
                <div
                  className={style.cursor_pointer}
                  style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                  onClick={handleAddOption}
                >
                  <Relationship
                    value={
                      <span
                        className={`${style.svg_icon_sm} ${style.svg_text}`}
                      >
                        <PlusIcon />
                      </span>
                    }
                    backgroundColor={grey(200)}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }

  return element;
}
