import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "./Question";
import { EditQuestionDialog } from "./EditQuestionDialog";
import { SplitHorizontal } from "components/layouts";
import { useFetchQuestions } from "api/resources/projects/questions";

/* eslint-disable no-unused-vars */
export const QuestionBuilder = () => {
  const { id } = useParams();
  const fetchQuestionsQuery = useFetchQuestions(id);
  const [active, setActive] = useState();

  const handleActivate = (id) => {
    setActive(id);
  };

  const activeQuestion = () => {
    return fetchQuestionsQuery.data?.find((q) => q.id == active);
  };

  // const handleQuestionTypeChange = (type) => {
  //   question.type = type;
  // };

  return (
    <>
      <SplitHorizontal>
        <>
          {fetchQuestionsQuery.isSuccess &&
            fetchQuestionsQuery.data.map((question) => (
              <Question
                key={question.id}
                question={question}
                active={active == question.id}
                activate={handleActivate}
              />
            ))}
        </>
        {fetchQuestionsQuery.isSuccess && active != null && (
          <EditQuestionDialog question={activeQuestion()} />
        )}
      </SplitHorizontal>
    </>
  );
};
