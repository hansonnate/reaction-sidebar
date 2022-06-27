import React from "react";
import { NumSlider } from "components/inputs/input_fields/NumSlider/NumSlider";
import { TextField } from "components/inputs";
import { useUpdateQuestion } from "api/resources/projects/questions";

export const NumberSliderQuestion = ({ question, active }) => {
  const updateQuestionQuery = useUpdateQuestion();

  const showMinDescription = () => {
    return question.minDescription || active;
  };

  const showMaxDescription = () => {
    return question.maxDescription || active;
  };

  const handleMinDescriptionChange = (minDescription) => {
    updateQuestionQuery.mutate({
      id: question.id,
      minDescription: minDescription,
    });
  };

  const handleMaxDescriptionChange = (maxDescription) => {
    updateQuestionQuery.mutate({
      id: question.id,
      maxDescription: maxDescription,
    });
  };

  return (
    <>
      <div className="d-flex mb-3">
        <NumSlider
          value={0}
          min={question.min}
          max={question.max}
          step={question.step}
        />
      </div>

      <div className="d-flex justify-content-between">
        <div className="w-60 mr-3">
          {showMinDescription() && (
            <TextField
              value={question.minDescription}
              placeholder={"Enter min description"}
              label="Min Description"
              inactive={!active}
              onSave={handleMinDescriptionChange}
            />
          )}
        </div>
        <div className="w-60 ml-3">
          {showMaxDescription() && (
            <TextField
              value={question.maxDescription}
              placeholder={"Enter max description"}
              label={"Max Description"}
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
