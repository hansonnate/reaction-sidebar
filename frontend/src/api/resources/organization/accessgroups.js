// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API


export const useFetchAccessGroupsGql = (token) => {
    const query = gql`
      query {
        accessgroups: allAccessGroups(token:"${token}") {
          id
          organizationId
          name
          whitelistUserIds {
            lastName
          }
          blacklistUserIds
          createdAt
        }
      }`;
  
    return useGqlQuery(["accessgroups"], query, {});
  };


  export const useUpdateAccessGroupGql = () => {
    const mutation = gql`
      mutation UpdateAccessGroup($input: UpdateInput!) {
        updateAccessGroup(input:$input) {
          ok
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
      mutation CreateAccessGroup($input: GenericScalar, $token: String!) {
        createAccessGroup(accessGroup: $input, token: $token) {
          ok
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