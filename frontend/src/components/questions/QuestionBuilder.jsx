import React, { useEffect } from "react";
import { useApi, QuestionsApi } from "api";

export const QuestionBuilder = ({ surveyId }) => {
  const getQuestions = useApi(QuestionsApi.getQuestions);

  useEffect(() => {
      getQuestions.request(surveyId);
  })
  return <div></div>;
};
