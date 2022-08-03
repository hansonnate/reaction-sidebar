// External
import React from "react";

// Internal
import { QuestionBuilder } from "components/questions/QuestionBuilder";
import { useParams } from "react-router-dom";
import { useFetchProjectGql } from "api/resources/projects/projects";

export const Questions = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProjectGql(id);
  return (
    <>
      {fetchProjectQuery.isSuccess && (
        <QuestionBuilder num_pages={fetchProjectQuery.data.survey.num_pages} />
      )}
    </>
  );
};
