import { apiClient } from "api/Api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { gql } from "graphql-request";

// eslint-disable-next-line no-unused-vars
import { useGqlQuery, useGqlMutation, useGqlSubscription } from "api/Api";

// GRAPHQL API
export const useFetchProjectsGql = (includeDesignSettings = false) => {
  const query = gql`
    query {
      surveys: allSurveys {
        id
        name
        status
        responseCount
        customFields
        createdAt
        updatedAt
        startedAt
        closedAt
        designSettings @include(if: ${includeDesignSettings})
      }
    }`;

  return useGqlQuery(["projects"], query, {});
};

export const useFetchProjectGql = (id, includeQuestions = false) => {
  const query = gql`
    query {
      survey: surveyById(id: "${id}") {
        id
        name
        question @include(if: ${includeQuestions}) {
          id
          type
          surveyId
          pageOrderIndex
          pageNumber
          isHidden
          createdAt
          updatedAt
          description
          questionText
        }
      }
    }
  `;

  return useGqlQuery(["projects", id], query, {});
};

export const useCreateProjectGql = () => {
  const mutation = gql`
    mutation CreateSurvey($survey: Object!, $token: String!) {
      createSurvey(survey: $survey, token: $token) {
        ok
      }
    }
  `;

  const options = {
    onMutate: (values) => {
      console.log("creating project");
      console.log(values);
    },
    onError: (err, _project, rollback) => {
      console.log(err);
      if (rollback) rollback();
    },
    onSettled: () => {
      useQueryClient().invalidateQueries("projects");
    },
  };
  
  return useGqlMutation(mutation, options);
};



// REST API
const uri = "/projects";

export const useFetchProjects = () => {
  return useQuery(
    "projects",
    () => apiClient.get(`${uri}`).then((res) => res.data),
    {}
  );
};

export const useFetchProject = (projectId) => {
  return useQuery(
    ["projects", projectId],
    () => apiClient.get(`${uri}/${projectId}`).then((res) => res.data),
    {}
  );
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => apiClient.post(`${uri}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        console.log("creating project");
        console.log(values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.patch(`${uri}/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        // queryClient.setQueriesData(["projects", values.id], values);
        console.log("updating project", values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
};
