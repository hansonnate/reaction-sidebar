import { apiClient } from "api/Api";
import { useQuery, useMutation, useQueryClient } from "react-query";


const uri = "/contacts"

export const useFetchContacts = () => {
  return useQuery(
    "contacts",
    () => apiClient.get(`${uri}`).then((res) => res.data),
    {}
  );
};

export const useFetchContact = (contactId) => {
  return useQuery(
    ["contacts", contactId],
    () => apiClient.get(`${uri}/${contactId}`).then((res) => res.data),
    {}
  );
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => apiClient.post(`${uri}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        console.log("creating contact");
        console.log(values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries("contacts");
      },
    }
  );
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) =>
      apiClient.patch(`${uri}/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryClient.setQueriesData(["contacts", values.id], values);
      },
      onError: (err, _project, rollback) => {
        console.log(err);
        if (rollback) rollback();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["contacts"]);
      },
    }
  );
};
