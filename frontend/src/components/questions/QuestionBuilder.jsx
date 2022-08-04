import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "./Question";
import { EditQuestionDialog } from "./EditQuestionDialog";
import { SplitHorizontal } from "components/layouts";
import styles from "./QuestionBuilder.module.scss";
import {
  useCreateQuestionGql,
  useFetchQuestionsGql,
  useCreatePage,
  useUpdateQuestionType,
  // useUpdateQuestionGql,
} from "api/resources/projects/questions";
import { useEffect, useRef } from "react";
import Button from "components/buttons/Button/Button";
import { useUpdateNumPages } from "api/resources/projects/projects";

/* eslint-disable no-unused-vars */
export const QuestionBuilder = ({ num_pages }) => {
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const fetchQuestionsQuery = useFetchQuestionsGql(id);
  // console.log(fetchQuestionsQuery);
  // const updateQuestionQuery = useUpdateQuestionGql(id);
  const createQuestionQuery = useCreateQuestionGql(id);
  const updateQuestionType = useUpdateQuestionType();
  const updateNumPages = useUpdateNumPages(id);
  const createPage = useCreatePage();
  const [message, setMessage] = useState(false);
  const pageNumber = 1;
  // const maxPage = 1;
  // eslint-disable-next-line no-unused-vars
  const [changesMade, setChangesMade] = useState(false);
  const [active, setActive] = useState();
  const [currPage, setCurrPage] = useState(pageNumber);
  const [page, setPage] = useState(pageNumber);
  const [maxPage, setMaxPage] = useState(num_pages);
  const [page2, setPage2] = useState(
    pageNumber + 1 > num_pages ? null : pageNumber + 1
  );
  const [page3, setPage3] = useState(
    pageNumber + 2 > num_pages ? null : pageNumber + 2
  );

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(null);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
      console.log("clicked");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const activeQuestion = () => {
    return fetchQuestionsQuery.data.Project.Pages[currPage - 1].Questions?.find(
      (q) => q.id === active
    );
  };

  const handleQuestionTypeChange = (type) => {
    setChangesMade(true);
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
  // useEffect(() => {
  //   // console.log("HEck YEAH")
  //   fetchQuestionsQuery.refetch();
  // }, [maxPage]);

  // console.log(createQuestionQuery);

  const handleCreateQuestion = () => {
    createQuestionQuery.mutate(
      {
        project_id: id,
        type: "MultipleChoice",
        page_order_index: 0,
        page_number: currPage,
        page_id: fetchQuestionsQuery.data.Project.Pages[currPage - 1].id,
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
          // window.scrollTo(0, document.getElementByID("scrollPane").scrollHeight);
          // scrollTo(0, document.getElementByID("scrollPane").scrollHeight);
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        },
      }
    );
  };

  //functionality for pages
  function nextPage() {
    if (currPage + 1 <= maxPage) {
      if (currPage === page3) {
        setPage(page3 + 1);
        setPage2(page3 + 2 > maxPage ? null : page3 + 2);
        setPage3(page3 + 3 > maxPage ? null : page3 + 3);
      }
      setCurrPage((page) => page + 1);
      setActive(null);
    }
  }
  function previousPage() {
    if (currPage - 1 > 0) {
      setCurrPage((page) => page - 1);
      setActive(null);
      if (currPage === page) {
        setPage(page - 3);
        setPage2(page - 2 > maxPage ? null : page - 2);
        setPage3(page - 1 > maxPage ? null : page - 1);
      }
    }
  }
  function addPage() {
    // if ((maxPage + 1) % 3 === 0) {
    //   setPage(maxPage - 1);
    //   setPage2(maxPage);
    //   setPage3(maxPage + 1);
    // } else if ((maxPage + 1) % 3 === 1) {
    //   setPage(maxPage + 1);
    //   setPage2(null);
    //   setPage3(null);
    // } else if ((maxPage + 1) % 3 === 2) {
    //   setPage(maxPage);
    //   setPage2(maxPage + 1);
    //   setPage3(null);
    // }
    if (currPage > 3) {
      if (currPage + 1 === maxPage + 1) {
        setPage(maxPage - 1);
        setPage2(maxPage);
        setPage3(maxPage + 1);
      } else if (currPage + 1 === maxPage) {
        setPage(maxPage + 1);
        setPage2(null);
        setPage3(null);
      } else if ((maxPage + 1) % 3 === 2) {
        setPage(maxPage);
        setPage2(maxPage + 1);
        setPage3(null);
      }
    } else {
      console.log("did it");
      if (maxPage === 1) {
        setPage2(maxPage + 1);
      } else if (maxPage === 2) {
        setPage3(maxPage + 1);
      }
    }
    createPage.mutate({
      project_id: id,
      page_num: maxPage + 1,
    });
    updateNumPages.mutate(
      {
        id: id,
        num_pages: maxPage + 1,
      },
      {
        onSuccess: () => {
          fetchQuestionsQuery.refetch();
          setMaxPage((page) => page + 1);
          // setCurrPage(maxPage + 1);
        },
      }
    );
  }

  // function deletePage() {
  //   if (maxPage > 1) {
  //     if (currPage === page) {
  //       setPage((page) => page - 1);
  //       setPage2(currPage);
  //       setPage3(currPage + 1);
  //     } else if ((maxPage + 1) % 3 === 1) {
  //       setPage(maxPage + 1);
  //       setPage2(null);
  //       setPage3(null);
  //     } else if ((maxPage + 1) % 3 === 2) {
  //       setPage(maxPage);
  //       setPage2(maxPage + 1);
  //       setPage3(null);
  //     }
  //   }
  // }

  return (
    <>
      <SplitHorizontal fullHeight leftWidth={8}>
        <>
          {fetchQuestionsQuery.isLoading && <p>Loading...</p>}
          {fetchQuestionsQuery.isError && <p>{fetchQuestionsQuery.error}</p>}
          {fetchQuestionsQuery.isSuccess && (
            <div className={`${styles.questionsContainer}`}>
              <div className={`${styles.scrollPane}`} id="scrollPane">
                {/* {console.log(fetchQuestionsQuery.data.Project.Questions)} */}

                <>
                  {fetchQuestionsQuery.data.Project.Pages[
                    currPage - 1
                  ].Questions?.map((question) => (
                    <div ref={ref} key={question.id}>
                      <Question
                        key={question.id}
                        question={question}
                        active={active == question.id}
                        activate={(id) => setActive(id)}
                      />
                    </div>
                  ))}

                  {fetchQuestionsQuery.data.Project.Pages[currPage - 1]
                    .Questions.length === 0 && (
                    <div className={styles.noQuestions}>
                      It looks like you have no questions. Click{" "}
                      <span onClick={handleCreateQuestion}>Add Question</span>{" "}
                      to create your first question.
                    </div>
                  )}
                </>

                <div ref={messagesEndRef}></div>
              </div>
              <div div className={`${styles.questionAdditions}`}>
                <Button
                  gray
                  className={styles.addition}
                  onClick={handleCreateQuestion}
                  width="130px"
                >
                  <i className="bi bi-plus-lg"></i> Add Question
                </Button>

                {/* Change Page Section */}
                <div className={styles.pages}>
                  <Button
                    width="130px"
                    red
                    className={styles.addition}
                    onClick={addPage}
                  >
                    <i className="bi bi-trash"></i> Delete Page
                  </Button>
                  <Button
                    width="100px"
                    gray
                    className={styles.addition}
                    onClick={addPage}
                  >
                    <i className="bi bi-plus-lg"></i> Add Page
                  </Button>
                  <div className={styles.changePage}>
                    <button
                      className={styles.nextButton}
                      onClick={() => previousPage(currPage)}
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
                    {maxPage > 3 && (
                      <>
                        <a>...</a>
                        <button
                          className={styles.pageButton}
                          // onClick={() => onPageClick(maxPage)}
                        >
                          {maxPage}
                        </button>
                      </>
                    )}
                    <button
                      className={styles.nextButton}
                      onClick={() => nextPage()}
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
          <div ref={ref}>
            <EditQuestionDialog
              question={activeQuestion()}
              refetch={() => fetchQuestionsQuery.refetch()}
              onTypeChange={handleQuestionTypeChange}
            />
          </div>
        )}
      </SplitHorizontal>
      {message && <div className={styles.messageBox}>Question Saved!</div>}
    </>
  );
};
