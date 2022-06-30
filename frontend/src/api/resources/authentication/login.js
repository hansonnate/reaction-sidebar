import { gql } from "graphql-request";
import { useGqlMutation } from "api/Api";


export const useLoginRequest = () => {
  const mutation = gql`
    mutation Login($username: String!, $password: String!) {
        authenticateUser(username: $username, password: $password) {
            ok
            token
        }
    }
  `;

  return useGqlMutation(mutation);
};
