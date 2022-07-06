import React, {useState, useEffect} from "react";
import {usePopper} from "react-popper";
import {grey} from "./colors";
import ArrowUpIcon from "./img/ArrowUp";
import ArrowDownIcon from "./img/ArrowDown";
import ArrowLeftIcon from "./img/ArrowLeft";
import ArrowRightIcon from "./img/ArrowRight";
import TrashIcon from "./img/Trash";
import TextIcon from "./Text";
import MultiIcon from "./img/Multi";
import HashIcon from "./img/Hash";
import PlusIcon from "./img/Plus";
import {shortId} from "./utils";
import style from "./Header.module.scss";

export default function Header({
  column: {id, created, label, dataType, getResizerProps, getHeaderProps},
  setSortBy,
  dataDispatch
}) {
  const [expanded, setExpanded] = useState(created || false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [inputRef, setInputRef] = useState(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    strategy: "absolute"
  });
  const [header, setHeader] = useState(label);
  const [typeReferenceElement, setTypeReferenceElement] = useState(null);
  const [typePopperElement, setTypePopperElement] = useState(null);
  const [showType, setShowType] = useState(false);
  const buttons = [
    {
      onClick: () => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        setSortBy([{id: id, desc: false}]);
        setExpanded(false);
      },
      icon: <ArrowUpIcon />,
      label: "Sort ascending"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        setSortBy([{id: id, desc: true}]);
        setExpanded(false);
      },
      icon: <ArrowDownIcon />,
      label: "Sort descending"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        dataDispatch({type: "add_column_to_left", columnId: id, focus: false});
        setExpanded(false);
      },
      icon: <ArrowLeftIcon />,
      label: "Insert left"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        dataDispatch({type: "add_column_to_right", columnId: id, focus: false});
        setExpanded(false);
      },
      icon: <ArrowRightIcon />,
      label: "Insert right"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        dataDispatch({type: "delete_column", columnId: id});
        setExpanded(false);
      },
      icon: <TrashIcon />,
      label: "Delete"
    }
  ];

  const types = [
    {
      onClick: () => {
        dataDispatch({type: "update_column_type", columnId: id, dataType: "select"});
        setShowType(false);
        setExpanded(false);
      },
      icon: <MultiIcon />,
      label: "Select"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_type", columnId: id, dataType: "text"});
        setShowType(false);
        setExpanded(false);
      },
      icon: <TextIcon />,
      label: "Text"
    },
    {
      onClick: () => {
        dataDispatch({type: "update_column_type", columnId: id, dataType: "number"});
        setShowType(false);
        setExpanded(false);
      },
      icon: <HashIcon />,
      label: "Number"
    }
  ];

  let propertyIcon;
  switch (dataType) {
    case "number":
      propertyIcon = <HashIcon />;
      break;
    case "text":
      propertyIcon = <TextIcon />;
      break;
    case "select":
      propertyIcon = <MultiIcon />;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (created) {
      setExpanded(true);
    }
  }, [created]);

  useEffect(() => {
    setHeader(label);
  }, [label]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  const typePopper = usePopper(typeReferenceElement, typePopperElement, {
    placement: "right",
    strategy: "fixed"
  });

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      dataDispatch({type: "update_column_header", columnId: id, label: header});
      setExpanded(false);
    }
  }

  function handleChange(e) {
    setHeader(e.target.value);
  }

  function handleBlur(e) {
    e.preventDefault();
    dataDispatch({type: "update_column_header", columnId: id, label: header});
  }

  return id !== 999999 ? (
    <>
      <div {...getHeaderProps({style: {display: "inline-block"}})} className={`${style.tr} ${style.noselect}`}>
        <div className={style.th_content} onClick={() => setExpanded(true)} ref={setReferenceElement}>
          <span className={`${style.svg_icon} ${style.svg_gray} ${style.icon_margin}`}>{propertyIcon}</span>
          {label}
        </div>
        <div {...getResizerProps()} className={style.resizer} />
      </div>
      {expanded && <div className={style.overlay} onClick={() => setExpanded(false)} />}
      {expanded && (
        <div ref={setPopperElement} style={{...styles.popper, zIndex: 3}} {...attributes.popper}>
          <div
            className={`${style.bg_white} ${style.shadow_5} ${style.border_radius_md}`}
            style={{
              width: 240
            }}>
            <div style={{paddingTop: "0.75rem", paddingLeft: "0.75rem", paddingRight: "0.75rem"}}>
              <div className={style.isfullwidth} style={{marginBottom: 12}}>
                <input
                  className={style.form_input}
                  ref={setInputRef}
                  type='text'
                  value={header}
                  style={{width: "100%"}}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <span className={style.propertytype}>
                Property Type
              </span>
            </div>
            <div style={{padding: "4px 0px"}}>
              <button
                className={style.sort_button}
                type='button'
                onMouseEnter={() => setShowType(true)}
                onMouseLeave={() => setShowType(false)}
                ref={setTypeReferenceElement}>
                <span className={`${style.svg_icon} ${style.svg_text} ${style.icon_margin}`}>{propertyIcon}</span>
                <span style={{textTransform: "capitalize"}}>{dataType}</span>
              </button>
              {showType && (
                <div
                  className={`${style.bg_white} ${style.shadow_5} ${style.border_radius_md}`}
                  ref={setTypePopperElement}
                  onMouseEnter={() => setShowType(true)}
                  onMouseLeave={() => setShowType(false)}
                  {...typePopper.attributes.popper}
                  style={{
                    ...typePopper.styles.popper,
                    width: 200,
                    backgroundColor: "white",
                    zIndex: 4,
                    padding: "4px 0px"
                  }}>
                  {types.map((type) => (
                    <button key={type.label} className={style.sort_button} onClick={type.onClick}>
                      <span className={`${style.svg_icon} ${style.svg_text} ${style.icon_margin}`}>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              key={shortId()}
              style={{
                borderTop: `2px solid ${grey(200)}`,
                padding: "4px 0px"
              }}>
              {buttons.map((button) => (
                <button key={shortId()} type='button' className={style.sort_button} onMouseDown={button.onClick}>
                  <span className={`${style.svg_icon} ${style.svg_text} ${style.icon_margin}`}>{button.icon}</span>
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div {...getHeaderProps({style: {display: "inline-block"}})} className={`${style.tableh} ${style.noselect}`}>
      <div
        className={style.th_content}
        style={{display: "flex", justifyContent: "center"}}
        onClick={() => dataDispatch({type: "add_column_to_left", columnId: 999999, focus: true})}>
        <span className={`${style.svg_icon} ${style.svg_gray}`}>
          <PlusIcon />
        </span>
      </div>
    </div>
  );
}
