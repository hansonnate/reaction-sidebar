// External
import React from "react";

// Internal
import { QuestionBuilder } from "components/questions/QuestionBuilder";

export const Questions = ({ project }) => {
  return <QuestionBuilder projectId={project.id} />;
};
