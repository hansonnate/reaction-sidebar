import React from "react";
import { NumChoices } from "components/inputs/input_fields/NumChoices/NumChoices";
import { TextField } from "components/inputs";
// import { useUpdateQuestion } from "api/resources/projects/questions";

export const NumberScaleQuestion = ({ question, active }) => {
  // const updateQuestionQuery = useUpdateQuestion();

  const showMinDescription = () => {
    return question.minDescription || active;
  };

  const showMaxDescription = () => {
    return question.maxDescription || active;
  };

  const handleMinDescriptionChange = () => {
    // updateQuestionQuery.mutate({
    //   id: question.id,
    //   minDescription: minDescription,
    // });
  };

  const handleMaxDescriptionChange = () => {
    // updateQuestionQuery.mutate({
    //   id: question.id,
    //   maxDescription: maxDescription,
    // });
  };

  return (
    <>
      <div className="d-flex mb-3">
        <NumChoices
          value={0}
          min={Number(question.min)}
          max={Number(question.max)}
          step={Number(question.step)}
        />
      </div>

      <div className="d-flex justify-content-between">
        <div className="w-60 mr-3">
          {showMinDescription() && (
            <TextField
              value={question.minDescription}
              placeholder={"Min Description"}
              inactive={!active}
              onSave={handleMinDescriptionChange}
            />
          )}
        </div>
        <div className="w-60 ml-3">
          {showMaxDescription() && (
            <TextField
              value={question.maxDescription}
              placeholder={"Max Description"}
              inactive={!active}
              align="right"
              onSave={handleMaxDescriptionChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
