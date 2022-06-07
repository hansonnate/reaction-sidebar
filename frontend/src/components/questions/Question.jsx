import { TextField } from "components/inputs";
import React from "react";

import styles from "./Question.module.scss";
import {
  MultipleChoiceQuestion,
  TextQuestion,
  NumberScaleQuestion,
  RankingQuestion,
  MatrixQuestion,
} from "./types";

export const QuestionType = {
  MultipleChoice: <MultipleChoiceQuestion />,
  Matrix: <MatrixQuestion />,
  Text: <TextQuestion />,
  NumberScale: <NumberScaleQuestion />,
  Ranking: <RankingQuestion />,
};

/**
 *
 * @class
 * @property {object} question The question object
 * @property {boolean} active Whether or not the question is active
 * @returns {React.ReactElement} A question component
 */
export const Question = ({ question, active, activate }) => {
  return (
    <div
      className={`${styles.questionContainer} ${active && styles.active}`}
      onClick={() => activate(question.id)}
    >
      <div className={styles.item}>
        <TextField
          value={question.name}
          placeholder="Enter question title"
        />
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
