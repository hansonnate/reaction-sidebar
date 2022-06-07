// External
import React from "react";
import { useParams } from "react-router-dom";

// Internal
import { QuestionBuilder } from "components/questions/QuestionBuilder";
import { useFetchProject } from "api/resources/projects/projects";

export const Questions = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const projectQuery = useFetchProject(id);

  return <QuestionBuilder projectId={id} />;
};
