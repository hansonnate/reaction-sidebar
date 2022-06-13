import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "./Question";
import { EditQuestionDialog } from "./EditQuestionDialog";
import { SplitHorizontal } from "components/layouts";
import styles from "./QuestionBuilder.module.scss";
import {
  useCreateQuestion,
  useFetchQuestions,
  useUpdateQuestion,
} from "api/resources/projects/questions";

/* eslint-disable no-unused-vars */
export const QuestionBuilder = () => {
  const { id } = useParams();
  const fetchQuestionsQuery = useFetchQuestions(id);
  const updateQuestionQuery = useUpdateQuestion(id);
  const createQuestionQuery = useCreateQuestion(id);
  const [active, setActive] = useState();

  const activeQuestion = () => {
    return fetchQuestionsQuery.data?.find((q) => q.id == active);
  };

  const handleQuestionTypeChange = (type) => {
    updateQuestionQuery.mutate({
      id: active,
      type: type,
    });
  };

  const handleCreateQuestion = (question) => {
    createQuestionQuery.mutate({
      projectId: id,
      type: "Text",
    });
    setActive(createQuestionQuery.data.id)
  };

  return (
    <>
      <SplitHorizontal fullHeight leftWidth={8}>
        <>
          {fetchQuestionsQuery.isSuccess && (
            <div className={`overflow-y-scroll ${styles.scrollPane}`}>
              {fetchQuestionsQuery.data.map((question) => (
                <Question
                  key={question.id}
                  question={question}
                  active={active == question.id}
                  activate={(id) => setActive(id)}
                />
              ))}
              <button onClick={handleCreateQuestion}>
                <i className="bi bi-plus-square"></i>
              </button>
            </div>
          )}
        </>
        {fetchQuestionsQuery.isSuccess && active != null && (
          <EditQuestionDialog
            question={activeQuestion()}
            onTypeChange={handleQuestionTypeChange}
          />
        )}
      </SplitHorizontal>
    </>
  );
};
