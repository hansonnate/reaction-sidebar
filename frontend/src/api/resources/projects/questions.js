import { apiClient } from "../../Api";
import { useQuery, useMutation, queryCache } from "react-query";

const uri = "/questions";

// Using react-query to cache the questions
export const useFetchQuestions = (projectId) => {
  return useQuery(
    ["projects", projectId, "questions"],                   // Cache key
    () => apiClient.get(`${uri}`).then((res) => res.data),  // Query function
    {                                                       // Query config    
      
    }               
  );
};

export const useFetchQuestion = (questionId) => {
  return useQuery(
    ["questions", questionId],
    () => apiClient.get(`${uri}/${questionId}`).then((res) => res.data),
    {}
  );
};

export const useCreateQuestion = () => {
  return useMutation(
    (values) => apiClient.post(`${uri}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        console.log("creating question");
        console.log(values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryCache.invalidateQueries("questions");
      },
    }
  );
};




// const getQuestion = (questionId) => apiClient.get(`${uri}/${questionId}`);
// const getQuestions = (projectId) => apiClient.get(`/projects/${projectId}?_embed=questions`);
// const postQuestion = (body) => {
//   apiClient.post(`${uri}`, body);
// };
// export default {
//   getQuestion,
//   getQuestions,
//   postQuestion,
// };


