import React, { useState, useRef } from "react";
import { Stack } from "@mui/material";
import styles from "./ImageUpload.module.scss";

export const ImageUpload = ({ onUpload, imageFile }) => {
  const [file, setFile] = useState(imageFile);
  const imageInput = useRef();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    imageInput.current.value = null;
    if (onUpload) {
      onUpload(null);
    }
  };

  return (
    <Stack direction="row" className="align-items-center" spacing={1}>
      <label>
        <input
          ref={imageInput}
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <span className={styles.button}>
          <i className="bi bi-upload" />
          &nbsp;&nbsp;Upload
        </span>
      </label>

      <div className={styles.fileNameContainer}>
        {file ? (
          <>
            <div className={styles.fileName}>{file.name}</div>
            <div onClick={handleRemoveFile} className={styles.deleteButton}>
              <i className="bi bi-x" />
            </div>
          </>
        ) : (
          "No image selected"
        )}
      </div>
    </Stack>
  );
};
