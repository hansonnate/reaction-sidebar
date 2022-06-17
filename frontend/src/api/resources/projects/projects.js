import { apiClient } from "api/Api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const uri = "/projects";

// Using react-query to cache the projects
export const useFetchProjects = () => {
  return useQuery(
    "projects",
    () => apiClient.get(`${uri}`).then((res) => res.data),
    {}
  );
};

// export const useFetchProjectsGql = () => {
//   const query = gql`
//     query {
//       projects {
//         id
//         name
//         status
//         responseCount
//         createAt
//       }
//     }`;

//   return useGqlQuery(["projects", projectId, "questions"], query, []);
// };

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
