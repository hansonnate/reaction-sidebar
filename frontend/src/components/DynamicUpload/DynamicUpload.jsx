import { SelectField, TextField } from "components/inputs";
import { Label } from "components/layouts/Label/Label";
import React from "react";
import styles from './DynamicUpload.module.scss';
export const DynamicUpload = () => {


  return (
    <div className={styles.page}>
      <Label>Rules</Label>
      <div className={styles.rules}>
          <SelectField></SelectField>
          <SelectField></SelectField>
          <TextField placeholder="Type..."></TextField>
      </div>
      <button> + New Rule</button>
    </div>
  );
};
