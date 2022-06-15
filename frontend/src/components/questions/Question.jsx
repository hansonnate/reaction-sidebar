import { useUpdateQuestion } from "api/resources/projects/questions";
import { TextField } from "components/inputs";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Question.module.scss";
import {
  MultipleChoiceQuestion,
  TextQuestion,
  NumberScaleQuestion,
  RankingQuestion,
  MatrixQuestion,
} from "./types";

/**
 *
 * @class
 * @property {object} question The question object
 * @property {boolean} active Whether or not the question is active
 * @returns {React.ReactElement} A question component
 */
export const Question = ({ question, active, activate }) => {
  const { id } = useParams();
  const updateQuestionQuery = useUpdateQuestion(id);

  const showInstructions = () => {
    return question.instructions || active;
  };

  const handleUpdateName = (name) => {
    updateQuestionQuery.mutate({
      id: question.id,
      name: name,
    });
  };

  const handleUpdateInstructions = (instructions) => {
    updateQuestionQuery.mutate({
      id: question.id,
      instructions: instructions,
    });
  };

  return (
    <div
      className={`${styles.questionContainer} ${active && styles.active}`}
      onClick={() => activate(question.id)}
    >
      <div className={styles.item}>
        <TextField
          value={question.name}
          placeholder="Enter question"
          inactive={!active}
          onSave={handleUpdateName}
          autoFocus
        />
      </div>
      {showInstructions() && (
        <div className={styles.item}>
          <TextField
            value={question.instructions}
            placeholder="Enter question instructions"
            inactive={!active}
            onSave={handleUpdateInstructions}
          />
        </div>
      )}
      {question.type === "MultipleChoice" && (
        <MultipleChoiceQuestion active={active} />
      )}
      {question.type === "Matrix" && <MatrixQuestion active={active} />}
      {question.type === "NumberScale" && (
        <NumberScaleQuestion active={active} />
      )}
      {question.type === "Ranking" && <RankingQuestion active={active} />}
      {question.type === "Text" && <TextQuestion active={active} />}
    </div>
  );
};
