import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "./Question";
import { EditQuestionDialog } from "./EditQuestionDialog";
import { SplitHorizontal } from "components/layouts";
import styles from "./QuestionBuilder.module.scss";
import {
  useCreateQuestionGql,
  useFetchQuestionsGql,
  useUpdateQuestionType,
  // useUpdateQuestionGql,
} from "api/resources/projects/questions";
import { useEffect } from "react";

/* eslint-disable no-unused-vars */
export const QuestionBuilder = () => {
  const { id } = useParams();
  const fetchQuestionsQuery = useFetchQuestionsGql(id);
  // const updateQuestionQuery = useUpdateQuestionGql(id);
  const createQuestionQuery = useCreateQuestionGql(id);
  const updateQuestionType = useUpdateQuestionType();
  const pageNumber = 1;
  const maxPage = 5;
  const [active, setActive] = useState();
  // eslint-disable-next-line no-unused-vars
  const [currPage, setCurrPage] = useState(pageNumber);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(pageNumber);
  // eslint-disable-next-line no-unused-vars
  const [page2, setPage2] = useState(
    pageNumber + 1 > maxPage ? null : pageNumber + 1
  );
  // eslint-disable-next-line no-unused-vars
  const [page3, setPage3] = useState(
    pageNumber + 2 > maxPage ? null : pageNumber + 2
  );

  const activeQuestion = () => {
    return fetchQuestionsQuery.data.Project.Questions?.find(
      (q) => q.id === active
    );
  };

  const handleQuestionTypeChange = (type) => {
    console.log(type);
    if (type === "MultipleChoice") {
      updateQuestionType.mutate(
        {
          id: active,
          type: type,
          question_type_config: {
            choice_question: {
              isMultiSelect: false,
              isRandomized: false,
              hasOtherOption: false,
              otherOptionText: "",
              choices: [{ id: 0, name: "Choice 1" }],
            },
          },
        },
        {
          onSuccess: () => {
            fetchQuestionsQuery.refetch();
          },
        }
      );
    }
  };

  useEffect(() => {
    // console.log("HEck YEAH")
    fetchQuestionsQuery.refetch();
  }, [active]);

  // console.log(createQuestionQuery);

  const handleCreateQuestion = () => {
    createQuestionQuery.mutate(
      {
        project_id: id,
        type: "MultipleChoice",
        page_order_index: 0,
        page_number: 1,
        is_hidden: false,
        created_at: "2020-01-01",
        updated_at: "2020-01-01",
        name: "New Question",
        instructions: "New Instructions",
        naOption: false,
        question_type_config: {
          choice_question: {
            isMultiSelect: false,
            isRandomized: false,
            hasOtherOption: false,
            otherOptionText: "",
            choices: [{ id: 0, name: "Choice 1" }],
          },
        },
      },
      {
        onSuccess: (data) => {
          setActive(data.createQuestion.id);
        },
      }
    );
  };

  return (
    <>
      <SplitHorizontal fullHeight leftWidth={8}>
        <>
          {fetchQuestionsQuery.isLoading && <p>Loading...</p>}
          {fetchQuestionsQuery.isError && <p>{fetchQuestionsQuery.error}</p>}
          {fetchQuestionsQuery.isSuccess && (
            <div className={`${styles.questionsContainer}`}>
              <div className={`${styles.scrollPane}`}>
                {/* {console.log(fetchQuestionsQuery.data.Project.Questions)} */}
                {fetchQuestionsQuery.data.Project.Questions?.map((question) => (
                  <Question
                    key={question.id}
                    question={question}
                    active={active == question.id}
                    activate={(id) => setActive(id)}
                  />
                ))}
              </div>
              <div div className={`${styles.questionAdditions}`}>
                <button
                  className={styles.addition}
                  onClick={handleCreateQuestion}
                >
                  <i className="bi bi-plus-lg"></i>
                  Add Question
                </button>
                <div className={styles.pages}>
                  <button
                    className={styles.addition}
                    onClick={handleCreateQuestion}
                  >
                    <i className="bi bi-plus-lg"></i>
                    Add Page
                  </button>
                  <div className={styles.changePage}>
                    <button
                      className={styles.nextButton}
                      // onClick={() => previousPage(currPage)}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    {page && (
                      <button
                        className={`${styles.pageButton} ${
                          currPage === page ? styles.currPage : ""
                        }`}
                        // onClick={() => onPageClick(page)}
                      >
                        {page}
                      </button>
                    )}
                    {page2 && (
                      <button
                        className={`${styles.pageButton} ${
                          currPage === page2 ? styles.currPage : ""
                        }`}
                        // onClick={() => onPageClick(page2)}
                      >
                        {page2}
                      </button>
                    )}
                    {page3 && (
                      <button
                        className={`${styles.pageButton} ${
                          currPage === page3 ? styles.currPage : ""
                        }`}
                        // onClick={() => onPageClick(page3)}
                      >
                        {page3}
                      </button>
                    )}
                    <a>...</a>
                    <button
                      className={styles.pageButton}
                      // onClick={() => onPageClick(maxPage)}
                    >
                      {maxPage}
                    </button>
                    <button
                      className={styles.nextButton}
                      // onClick={() => nextPage()}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        {fetchQuestionsQuery.isSuccess && active != null && (
          <EditQuestionDialog
            question={activeQuestion()}
            refetch={() => fetchQuestionsQuery.refetch()}
            onTypeChange={handleQuestionTypeChange}
          />
        )}
      </SplitHorizontal>
    </>
  );
};
