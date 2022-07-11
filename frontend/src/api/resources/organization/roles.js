// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";


// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchRolesGql = () => {
  const query = gql`
    query {
      allRoles {
        id
        organization_id
        name
        description
        permissions
      }
    }
  `;

  return useGqlQuery(["roles"], query, {});
};

export const useCreateRolesGql = () => {
  const mutation = gql`
    mutation CreateRole($organization_id: ID!
      $name: String!
      $description: String!
      $permissions: JSON!) {
      createRole(organization_id: $organization_id, name: $name, description: $description, permissions: $permissions) {
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
      queryClient.invalidateQueries("roles");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateRolesGql = () => {
  const mutation = gql`
    mutation UpdateRole(
      $id: ID!
      $organization_id: ID!
      $name: String!
      $description: String!
      $permissions: JSON!
    ) {
      updateRole(id: $id organization_id: $organization_id, name: $name, description: $description, permissions: $permissions) {
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
      queryClient.invalidateQueries(["roles"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useFetchUserGql = (id, token) => {
  const query = gql`
      query {
        user: userById(id: "${id}", token:"${token}") {
          id
          firstName
          lastName
          email
          role
          prefix
          lastSignInAt
          signInCount
        }
      }`;

  return useGqlQuery(["users", id], query, {});
};
