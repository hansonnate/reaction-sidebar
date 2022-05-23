import React, { useEffect } from "react";
import { useApi, QuestionsApi } from "api";
import { Question } from "./Question";
import { SplitHorizontal } from "components/layouts";

export const QuestionBuilder = ({ projectId }) => {
  const getQuestions = useApi(QuestionsApi.getQuestions);

  useEffect(() => {
    getQuestions.request(projectId);
  }, []);

  return (
    <>
      <SplitHorizontal>
        <>
          {getQuestions.loading && <p>Loading...</p>}
          {getQuestions.error && <p>{getQuestions.error}</p>}
          {getQuestions.data?.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </>
        <div>Menu</div>
      </SplitHorizontal>
    </>
  );
};
