import { apiClient } from "../../Api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { gql } from "graphql-request";

import { useGqlQuery, useGqlMutation } from "api/Api";

// GQL API METHODS
export const useFetchQuestionsGql = (projectId) => {
  const query = gql`
    query {
      Project(id: "${projectId}") {
        name
        Questions {
          id
          name
          description
          Choices {
            id
            choice_value
          }
          project_id
          type
          instructions
          otherOption
          otherOptionText
          isMultiSelect
        }
      }
    }
  `;

  return useGqlQuery(["projects", projectId, "questions"], query, {});
};

export const useFetchQuestionGql = (questionId, projectId = null) => {
  const query = gql`
    query {
      question(id: "${questionId}" ) {
        id
        name
        type
        description
        instructions
        otherOptionText
        project_id
        Choices {
          id
          choice_value
        }
      }
    }`;

  let options = {};
  if (projectId) {
    const queryClient = useQueryClient();
    options = {
      initialData: () => {
        return queryClient
          .getQueryData(["projects", projectId, "questions"])
          ?.find((d) => d.id == questionId);
      },
    };
  }

  return useGqlQuery(["questions", questionId], query, [], options);
};

export const useCreateQuestionGql = (projectId) => {
  const mutation = gql`
    mutation createQuestion($values: QuestionCreateInput!) {
      create_question_one(object: $values) {
        title
        instructions
      }
    }
  `;

  const queryClient = useQueryClient();
  const options = {
    onError: (err, _project, rollback) => {
      console.log(err);
      if (rollback) rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projects", projectId, "questions"]);
    },
  };

  return useGqlMutation(mutation, [], options);
};

export const useUpdateQuestionGql = (projectId) => {
  const mutation = gql`
    mutation updateQuestion($values: QuestionUpdateInput!) {
      update_question_one(object: $values) {
        title
        instructions
      }
    }
  `;

  const queryClient = useQueryClient();
  const options = {
    onError: (err, _project, rollback) => {
      console.log(err);
      if (rollback) rollback();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", projectId, "questions"]);
    },
  };

  return useGqlMutation(mutation, [], options);
};

// REST API METHODS
const uri = "/questions";

export const useFetchQuestions = (projectId) => {
  return useQuery(
    ["projects", projectId, "questions"], // Cache key
    () =>
      apiClient.get(`${uri}?projectId=${projectId}`).then((res) => res.data), // Query function
    {
      // Query config
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

export const useCreateQuestion = (projectId) => {
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries(["projects", projectId, "questions"]);
      },
    }
  );
};

export const useUpdateQuestion = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.patch(`${uri}/${values.id}`, values).then((res) => res.data),
    {
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["projects", projectId, "questions"]);
      },
    }
  );
};

export const useDeleteQuestion = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (questionId) =>
      apiClient.delete(`${uri}/${questionId}`).then((res) => res.data),
    {
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["projects", projectId, "questions"]);
      },
    }
  );
};

export const useFetchQuestionChoices = (projectId, questionId) => {
  return useQuery(
    ["projects", projectId, "questions", questionId, "choices"],
    () =>
      apiClient
        .get(`/questions/${questionId}?_embed=choices&projectId=${projectId}`)
        .then((res) => res.data.choices),
    {}
  );
};

export const useUpdateQuestionChoices = (projectId, questionId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.patch(`/choices/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        // queryClient.setQueriesData(
        //   ["projects", projectId, "questions", questionId, "choices"],

        // );
        console.log(values, questionId);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["projects", projectId, "questions"]);
      },
    }
  );
};

export const useCreateQuestionChoice = (projectId, questionId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => apiClient.post(`/choices`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        console.log("creating question", values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          "projects",
          projectId,
          "questions",
          questionId,
          "choices",
        ]);
      },
    }
  );
};

export const useDeleteQuestionChoice = (projectId, questionId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.delete(`/choices/${values.id}`).then((res) => res.data),
    {
      onMutate: () => {
        console.log("deleting question");
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          "projects",
          projectId,
          "questions",
          questionId,
          "choices",
        ]);
      },
    }
  );
};
