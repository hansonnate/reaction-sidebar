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
        members
      }
    }
  `;

  return useGqlQuery(["emails"], query, {});
};

export const useFetchAudienceGql = (id) => {
  const query = gql`
    query {
      survey: Project(id: "${id}") {
        id
        name
      }
    }
  `;

  return useGqlQuery(["emails", id], query, {});
};

export const useCreateAudienceGql = () => {
  const mutation = gql`
  mutation CreateProject(
    $organization_id: ID!
    $name: String!
    $description: String!
    $created_at: String!
    $updated_at: String!
    $status: String!
    $responses: Int!
    $owner: String!
    ) {
    createProject(organization_id: $organization_id, name: $name, description: $description, created_at: $created_at, updated_at: $updated_at, status: $status, responses: $responses, owner: $owner) {
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
      queryClient.invalidateQueries("emails");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateAudienceGql = () => {
  const mutation = gql`
    mutation UpdateSurvey(
      $id: String!
      $input: GenericScalar
      $token: String!
    ) {
      updateSurvey(surveyId: $id, survey: $input, token: $token) {
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
      queryClient.invalidateQueries(["emails"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteAudienceGql = () => {
  const mutation = gql`
  mutation RemoveProject($id: ID!) {
    removeProject(id: $id) {
      id
    }
  }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["emails"]);
    },
  };

  return useGqlMutation(mutation, options);
};

