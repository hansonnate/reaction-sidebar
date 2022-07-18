import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchUsersGql = () => {
  const query = gql`
    query {
      allUsers {
        id
        firstname
        lastname
        email
        position
        company
        Role {
          id
          name
          description
        }
        last_sign_in_at
        Organization {
          id
          Roles {
            id
            name
            description
          }
        }
      }
    }
  `;

  return useGqlQuery(["users"], query, {});
};

export const useFetchUserGql = (id, token) => {
  const query = gql`
      query {
        user: userById(id: "${id}", token:"${token}") {
          id
          firstname
          lastname
          organization_id
          email
          position
          company
          created_at
          updated_at
          last_sign_in_at
        }
      }`;

  return useGqlQuery(["users", id], query, {});
};

export const useSearchUserGql = (id, string) => {
  const query = gql`
    query {
      allUsers(filter: {organization_id: "${id}" q: "${string}"}) {
        id
        firstname
        lastname
        organization_id
        email
        position
        company
        created_at
        updated_at
        last_sign_in_at
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

export const useCreateUserGql = () => {
  const mutation = gql`
    mutation CreateUser(
      $role_id: ID!
      $organization_id: ID!
      $firstname: String!
      $lastname: String!
      $email: String!
      $position: String!
      $company: String!
      $created_at: String!
      $updated_at: String!
      $last_sign_in_at: String!
    ) {
      createUser(
        role_id: $role_id
        organization_id: $organization_id
        firstname: $firstname
        lastname: $lastname
        email: $email
        position: $position
        company: $company
        created_at: $created_at
        updated_at: $updated_at
        last_sign_in_at: $last_sign_in_at
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
      queryClient.invalidateQueries("projects");
    },
  };

  return useGqlMutation(mutation, options);
};
