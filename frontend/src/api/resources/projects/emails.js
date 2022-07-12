// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchEmailsGql = () => {
  const query = gql`
    query {
      allEmails {
        id
        project_id
        subject
        audience_id
        status
        date
        strength
      }
    }
  `;

  return useGqlQuery(["emails"], query, {});
};

export const useFetchEmailGql = (id) => {
  const query = gql`
    query {
      survey: Project(id: "${id}") {
        id
        name
      }
    }
  `;

  return useGqlQuery(["emails", id], query, {});
};

export const useCreateEmailGql = () => {
  const mutation = gql`
  mutation CreateProject(
    $organization_id: ID!
    $name: String!
    $description: String!
    $created_at: String!
    $updated_at: String!
    $status: String!
    $responses: Int!
    $owner: String!
    ) {
    createProject(organization_id: $organization_id, name: $name, description: $description, created_at: $created_at, updated_at: $updated_at, status: $status, responses: $responses, owner: $owner) {
      id
    }
  }
  `;
  const queryClient = useQueryClient();
  const options = {
    onError: (err, _project, rollback) => {
      if (rollback) rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries("emails");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateEmailGql = () => {
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
      queryClient.invalidateQueries(["emails"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteEmailGql = () => {
  const mutation = gql`
  mutation RemoveProject($id: ID!) {
    removeProject(id: $id) {
      id
    }
  }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["emails"]);
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
