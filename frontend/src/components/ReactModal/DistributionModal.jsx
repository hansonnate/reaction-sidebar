import React, { useEffect, useRef } from "react";
import ActionButton from "../ActionButton/ActionButton.jsx";
// import CloseIcon from "../CloseIcon";
import styles from "./DistributionModal.module.scss";

const Modal = ({ modalStyle, children, show, onClose, onSave, backdropStyle }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} style={backdropStyle} className={`${styles.modal}`}>
        <div style={modalStyle} className={styles.modal__wrap}>
          <div className={styles.buttonclose}>
            <ActionButton functionality={onClose} title="Close"></ActionButton>
          </div>
          {children}
          <div className={styles.buttonsave}>
            <ActionButton functionality={onSave} title="Save"></ActionButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
