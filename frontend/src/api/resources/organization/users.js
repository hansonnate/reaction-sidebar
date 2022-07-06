// External
// import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery } from "api/Api";

// GRAPHQL API


export const useFetchUsersGql = () => {
    const query = gql`
      query {
        users: allUsers {
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
  
    return useGqlQuery(["users"], query, {});
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
  
    return useGqlQuery(["users",id], query, {});
  };