// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchAccessGroupsGql = () => {
  const query = gql`
    query {
      allAccessgroups {
        id
        organization_id
        name
        description
        whitelist_user_ids
        blacklist_user_ids
      }
    }
  `;

  return useGqlQuery(["accessgroups"], query, {});
};

export const useUpdateAccessGroupGql = () => {
  const mutation = gql`
  mutation UpdateAccessGroup(
    $id: ID!
    $organization_id: ID
    $name: String
    $description: String
    $whitelist_user_ids: JSON
    $blacklist_user_ids: JSON
  ) {
    updateAccessgroup(id: $id organization_id: $organization_id, name: $name, description: $description, whitelist_user_ids: $whitelist_user_ids, blacklist_user_ids: $blacklist_user_ids) {
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
      queryClient.invalidateQueries("accessgroups");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useCreateAccessGroupGql = () => {
  const mutation = gql`
  mutation CreateAccessGroup($organization_id: ID!
    $name: String!
    $description: String!
    $whitelist_user_ids: JSON!
    $blacklist_user_ids: JSON!
    $created_at: String!
    $updated_at: String!
    ) {
    createAccessgroup(organization_id: $organization_id, name: $name, description: $description, whitelist_user_ids: $whitelist_user_ids, blacklist_user_ids: $blacklist_user_ids, created_at: $created_at, updated_at: $updated_at) {
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
      queryClient.invalidateQueries("accessgroups");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteAccessGroupGql = () => {
  const mutation = gql`
    mutation RemoveAccessGroup($id: ID!) {
      removeAccessgroup(id: $id) {
        id
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["accessgroups"]);
    },
  };

  return useGqlMutation(mutation, options);
};
