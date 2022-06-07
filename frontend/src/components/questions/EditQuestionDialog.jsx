import { SelectField } from "components/inputs";
import React from "react";

import styles from "./EditQuestionDialog.module.scss";

export const EditQuestionDialog = ({ question }) => {
  const questionTypes = {
    MultipleChoice: { label: "Multiple Choice", value: "MultipleChoice" },
    Text: { label: "Text", value: "Text" },
    NumberScale: { label: "Number Scale", value: "NumberScale" },
    Ranking: { label: "Ranking", value: "Ranking" },
    Matrix: { label: "Matrix", value: "Matrix" },
  };

  console.log(question);
  const handleQuestionTypeChange = (type) => {
    question.type = type;
  };

  return (
    <div className={`${styles.dialog}`}>
      <SelectField
        options={Object.values(questionTypes)}
        value={questionTypes[question.type]}
        handleSelection={handleQuestionTypeChange}
      />
    </div>
  );
};
