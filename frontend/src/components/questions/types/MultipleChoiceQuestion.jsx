import React from "react";
// import { useParams } from "react-router-dom";
// import {
//   useFetchQuestionChoices,
//   useUpdateQuestionChoices,
//   useCreateQuestionChoice,
//   useDeleteQuestionChoice,
// } from "api/resources/projects/questions";
// import { MultipleChoice } from "components/inputs/input_fields/MultipleChoice/MultipleChoice";

export const MultipleChoiceQuestion = ( ) => {
  // const { id } = useParams();
  // const fetchQuestionChoicesQuery = useFetchQuestionChoices(id, question_id);
  // const updateQuestionChoicesQuery = useUpdateQuestionChoices(id, question_id);
  // const createQuestionChoiceQuery = useCreateQuestionChoice(id, question_id);
  // const deleteQuestionChoiceQuery = useDeleteQuestionChoice(id, question_id);

  // const handleUpdateQuestionChoices = (choice) => {
    // updateQuestionChoicesQuery.mutate({
    //   questionId: question_id,
    //   id: choice.id,
    //   name: choice.name,
    // });
  // };

  // const handleCreateQuestionChoice = () => {
    // createQuestionChoiceQuery.mutate({
    //   questionId: question_id,
    //   name: "",
    // });
  // };

  // const handleDeleteQuestionChoice = (choiceId) => {
  //   console.log(choiceId)
    // deleteQuestionChoiceQuery.mutate(choiceId);
  // }

  // if (fetchQuestionChoicesQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (fetchQuestionChoicesQuery.isError) {
  //   return <div>Error</div>;
  // }

  // if (fetchQuestionChoicesQuery.isSuccess) {
  //   return (
  //     <>
  //       <MultipleChoice
  //         name={question_id}
  //         options={fetchQuestionChoicesQuery.data}
  //         handleNameChange={handleUpdateQuestionChoices}
  //         handleDelete={handleDeleteQuestionChoice}
  //         active={active}
  //         isMultiSelect={isMultiSelect}
  //         otherOption={otherOption}
  //       />
  //       {active && (
  //         <button className={`ml-2`} style={{color: "#A3A4A8"}} onClick={handleCreateQuestionChoice}>
  //           <i className="bi bi-plus-lg mr-3"></i>
  //           Add Option
  //         </button>
  //       )}
  //     </>
  //   );
  // }
  return <div>nothing</div>
};
