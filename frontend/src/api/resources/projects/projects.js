// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchProjectsGql = (page, perPage) => {
  const query = gql`
    query {
      surveys: allProjects(page: ${page}, perPage: ${perPage}) {
        id
        name
        description
        status
        responses
        owner
        created_at
        updated_at
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
        description
        status
        responses
        owner
        default_language
        supported_languages
        accessgroup_ids
        num_pages
      }
    }
  `;

  return useGqlQuery(["projects", id], query, {});
};

export const useSearchProjectGql = (id, string) => {
  const query = gql`
    query {
      allProjects(filter: {organization_id: "${id}" q: "${string}"}) {
        id
        name
        description
        status
        responses
        owner
        created_at
        updated_at
      }
    }`;

    const queryClient = useQueryClient();
    const options = {
      onError: (err, _project, rollback) => {
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    };

  return useGqlQuery(["users", id], query, options);
};

export const useCreateProjectGql = () => {
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
      $default_language: String!
      $supported_languages: [String]!
      $accessgroup_ids:[String]!
      $num_pages: Int!
    ) {
      createProject(
        organization_id: $organization_id
        name: $name
        description: $description
        created_at: $created_at
        updated_at: $updated_at
        status: $status
        responses: $responses
        owner: $owner
        default_language: $default_language
        supported_languages: $supported_languages
        accessgroup_ids: $accessgroup_ids
        num_pages: $num_pages
      ) {
        id
        name
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

export const useUpdateNumPages = () => {
  const mutation = gql`
    mutation UpdateProject(
      $id: ID!
      $num_pages: Int!
    ) {
      updateProject(
        id: $id
        num_pages: $num_pages
      ) {
        id
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
    mutation RemoveProject($id: ID!) {
      removeProject(id: $id) {
        id
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
