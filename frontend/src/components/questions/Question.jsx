import {
  useDeleteQuestion,
  useUpdateQuestion,
} from "api/resources/projects/questions";
import { IconButton } from "components/buttons/IconButton/IconButton";
import { TextField } from "components/inputs";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Question.module.scss";
import {
  MultipleChoiceQuestion,
  TextQuestion,
  NumberScaleQuestion,
  NumberSliderQuestion,
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
  const deleteQuestionQuery = useDeleteQuestion(id);

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

  const handleDeleteQuestion = () => {
    activate(null);
    deleteQuestionQuery.mutate(question.id);
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
          label="Question"
          inactive={!active}
          onSave={handleUpdateName}
          autoFocus
          customStyles={!active && styles.headerText}
        />
      </div>
      {showInstructions() && (
        <div className={styles.item}>
          <TextField
            value={question.instructions}
            placeholder="Enter question instructions"
            label="Instructions"
            inactive={!active}
            onSave={handleUpdateInstructions}
            customStyles={!active && styles.instructionsText}
          />
        </div>
      )}
      <div className={styles.spacer} />
      {question.type === "MultipleChoice" && (
        <MultipleChoiceQuestion
          question_id={question.id}
          active={active}
          isMultiSelect={question.isMultiSelect}
          otherOption={question.otherOption ? question.otherOptionText : null}
        />
      )}
      {question.type === "Matrix" && (
        <MatrixQuestion question_id={question.id} active={active} />
      )}
      {question.type === "NumberScale" && (
        <NumberScaleQuestion question={question} active={active} />
      )}
      {question.type === "NumberSlider" && (
        <NumberSliderQuestion question={question} active={active} />
      )}
      {question.type === "Ranking" && (
        <RankingQuestion question_id={question.id} active={active} />
      )}
      {question.type === "Text" && (
        <TextQuestion question_id={question.id} active={active} />
      )}
      {active && (
        <div className="d-flex justify-content-end mt-3">
          <IconButton onClick={handleDeleteQuestion}>
            <i className="bi bi-trash3"></i>
            <span> Delete Question</span>
          </IconButton>
        </div>
      )}
    </div>
  );
};
