// import {
//   useDeleteQuestion,
//   useUpdateQuestion,
// } from "api/resources/projects/questions";
import { useUpdateQuestionInstructions, useUpdateQuestionName } from "api/resources/projects/questions";
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
export const Question = ({ question, active, activate}) => {
  const { id } = useParams();
  const updateQuestionName = useUpdateQuestionName(id);
  const updateQuestionInstructions = useUpdateQuestionInstructions();
  // const [questionName, setQuestionName] = useState(question.name);
  // const deleteQuestionQuery = useDeleteQuestion(id);

  const showInstructions = () => {
    return question.instructions || active;
  };

  const handleUpdateName = (name) => {
    updateQuestionName.mutate({
      id: question.id,
      name: name,
    });
    // setQuestionName(name);
  };

  const handleUpdateInstructions = (instructions) => {
    updateQuestionInstructions.mutate({
      id: question.id,
      instructions: instructions,
    });
  };

  // const handleDeleteQuestion = () => {
  //   activate(null);
  //   // deleteQuestionQuery.mutate(question.id);
  // };

  return (
    <div
      className={`${styles.questionContainer} ${active && styles.active}`}
      onClick={() => activate(question.id)}
    >
      <div className={styles.iconContainer}><i className="bi bi-grip-horizontal"></i></div>
      <div className={styles.item}>
      <TextField
            value={question.name}
            placeholder="Enter question name"
            label="Quesiton Name"
            inactive={!active}
            onSave={handleUpdateName}
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
          question={question}
          active={active}
          isMultiSelect={question.question_type_config.choice_question.isMultiSelect}
          otherOption={question.question_type_config.choice_question.hasOtherOption ? question.question_type_config.choice_question.otherOptionText : null}
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
    </div>
  );
};
