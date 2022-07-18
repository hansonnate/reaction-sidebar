// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchAudiencesGql = () => {
  const query = gql`
    query {
      allAudiences {
        id
        name
        description
        members
        contact_ids
        created_at
        modified_at
      }
    }
  `;

  return useGqlQuery(["audience"], query, {});
};

export const useFetchAudienceGql = (id) => {
  const query = gql`
    query {
      Audience(id: "${id}") {
        id
        name
        description
      }
    }
  `;

  return useGqlQuery(["audience", id], query, {});
};

export const useCreateAudienceGql = () => {
  const mutation = gql`
    mutation CreateAudience(
      $name: String!
      $members: Int!
      $contact_ids: [Int]!
      $created_at: String!
      $modified_at: String!
      $description: String!
    ) {
      createAudience(
        name: $name,
        members: $members,
        contact_ids: $contact_ids,
        created_at: $created_at,
        modified_at: $modified_at,
        description: $description
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
    onSettled: () => {
      queryClient.invalidateQueries("audience");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateAudienceGql = () => {
  const mutation = gql`
    mutation UpdateAudience(
      $id: ID!
      $name: String
      $members: Int
      $contact_ids: [Int]
      $created_at: String
      $modified_at: String
      $description: String
    ) {
      updateAudience(
        id: $id, 
        name: $name,
        members: $members,
        contact_ids: $contact_ids,
        created_at: $created_at,
        modified_at: $modified_at,
        description: $description
        ) {
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
      queryClient.invalidateQueries(["audience"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteAudienceGql = () => {
  const mutation = gql`
    mutation RemoveAudience($id: ID!) {
      removeAudience(id: $id) {
        id
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["audience"]);
    },
  };

  return useGqlMutation(mutation, options);
};
