// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchProjectsGql = () => {
  const query = gql`
    query {
      surveys: allProjects {
        id
        name
        status
        responses
        owner

      }
    }
  `;

  return useGqlQuery(["projects"], query, {});
};

export const useFetchProjectGql = (id) => {
  const query = gql`
    query {
      survey: Project(id: "${id}") {
        id
        name
      }
    }
  `;

  return useGqlQuery(["projects", id], query, {});
};

export const useCreateProjectGql = () => {
  const mutation = gql`
    mutation CreateSurvey($input: GenericScalar, $token: String!) {
      createSurvey(survey: $input, token: $token) {
        ok
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onError: (err, _project, rollback) => {
      if (rollback) rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries("projects");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateProjectGql = () => {
  const mutation = gql`
    mutation UpdateSurvey(
      $id: String!
      $input: GenericScalar
      $token: String!
    ) {
      updateSurvey(surveyId: $id, survey: $input, token: $token) {
        ok
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onError: (err, _project, rollback) => {
      if (rollback) rollback();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteProjectGql = () => {
  const mutation = gql`
    mutation DeleteSurvey($id: String!, $token: String!) {
      deleteSurvey(surveyId: $id, token: $token) {
        ok
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  };

  return useGqlMutation(mutation, options);
};

// REST API
// const uri = "/projects";

// export const useFetchProjects = () => {
//   return useQuery(
//     "projects",
//     () => apiClient.get(`${uri}`).then((res) => res.data),
//     {}
//   );
// };

// export const useFetchProject = (projectId) => {
//   return useQuery(
//     ["projects", projectId],
//     () => apiClient.get(`${uri}/${projectId}`).then((res) => res.data),
//     {}
//   );
// };

// export const useCreateProject = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (values) => apiClient.post(`${uri}`, values).then((res) => res.data),
//     {
//       onMutate: (values) => {
//         console.log("creating project");
//         console.log(values);
//       },
//       onError: (err, _project, rollback) => {
//         console.log(err);
//         if (rollback) rollback();
//       },
//       onSettled: () => {
//         queryClient.invalidateQueries("projects");
//       },
//     }
//   );
// };

// export const useUpdateProject = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (values) =>
//       apiClient.patch(`${uri}/${values.id}`, values).then((res) => res.data),
//     {
//       onMutate: (values) => {
//         // queryClient.setQueriesData(["projects", values.id], values);
//         console.log("updating project", values);
//       },
//       onError: (err, _project, rollback) => {
//         console.log(err);
//         if (rollback) rollback();
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries(["projects"]);
//       },
//     }
//   );
// };
