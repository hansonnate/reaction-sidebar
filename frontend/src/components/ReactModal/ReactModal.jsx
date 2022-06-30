import React, { useEffect, useRef } from "react";

import Button from "components/Button/Button";
import styles from "./ReactModal.module.scss";

const Modal = ({
  modalStyle,
  children,
  show,
  onClose,
  onSave,
  backdropStyle,
  saveID,
}) => {
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
          {children}
          <div className={styles.buttons}>
            <div className={styles.buttonclose}>
              <Button
                onClick={onClose}
              >Close</Button>
            </div>
            <div className={styles.buttonsave} id={saveID}>
              <Button onClick={onSave}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
