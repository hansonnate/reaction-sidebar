// External
import React from "react";
import { SaveForm } from "components/inputs";

import { SelectField } from "components/inputs";
import styles from "./Reports.module.scss";
import ActionButton from "components/buttons/ActionButton/ActionButton";
// Internal

export const Reports = () => {

  const tags = [
    { value: "Product", label: "CSV" },
    { value: "Corporate", label: "XLS" },
    { value: "Service", label: "PDF" },
    { value: "Service", label: "Book Report" },
  ];

  return (
    <div className={styles.page}>
      <SaveForm
        fields={[
          {
            label: "Download Visualization Report",
            field: (
              <div className={styles.filetype}>
                <SelectField
                  options={tags}
                  selectMultiple
                  placeholder="File Type..."
                ></SelectField>{" "}
                <ActionButton title="Download"></ActionButton>
              </div>
            ),
          },
          {
            label: "Download Results by Participation",
            field: (
              <div className={styles.filetype}>
                <SelectField
                  options={tags}
                  selectMultiple
                  placeholder="File Type..."
                ></SelectField>{" "}
                <ActionButton title="Download"></ActionButton>
              </div>
            ),
          },
          {
            label: "Download Results by Answer",
            field: (
              <div className={styles.filetype}>
                <SelectField
                  options={tags}
                  selectMultiple
                  placeholder="File Type..."
                ></SelectField>{" "}
                <ActionButton title="Download"></ActionButton>
              </div>
            ),
          },
        ]}
      ></SaveForm>
    </div>
  );
};
