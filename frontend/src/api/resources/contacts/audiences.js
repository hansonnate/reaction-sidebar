import { apiClient } from "api/Api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const uri = "/audiences"

export const useFetchAudiences = () => {
  return useQuery(
    "audiences",
    () => apiClient.get(`${uri}`).then((res) => res.data),
    {}
  );
};

export const useFetchAudience = (audienceId) => {
  return useQuery(
    ["audiences", audienceId],
    () => apiClient.get(`${uri}/${audienceId}`).then((res) => res.data),
    {}
  );
};

export const useCreateAudience = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => apiClient.post(`${uri}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        console.log("creating audience");
        console.log(values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries("audiences");
      },
    }
  );
};

export const useUpdateAudience = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.patch(`${uri}/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryClient.setQueriesData(["audiences", values.id], values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["audiences"]);
      },
    }
  );
};

