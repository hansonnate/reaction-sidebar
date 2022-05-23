import { TextField } from "components/inputs";
import React from "react";

import styles from "./Question.module.scss";
import { MultipleChoiceQuestion, MatrixQuestion } from "./types";

const QuestionType = {
  MultipleChoice: <MultipleChoiceQuestion />,
  Matrix: <MatrixQuestion />,
};

// const questionType = (type) => {
//     switch (type) {
//         case 0:

//     }

// }

export const Question = ({ question, active }) => {
  return (
    <div className={`${styles.questionContainer} ${active && styles.active}`}>
      <div className={styles.item}>
        <TextField value={question.name} placeholder="Enter question title" />
      </div>
      <div className={styles.item}>
        <TextField
          value={question.instructions}
          placeholder="Enter question instructions"
        />
      </div>
      {QuestionType[question.type]}
    </div>
  );
};
