// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";


// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchVisualizationsGql = () => {
  const query = gql`
    query {
      allVisualizations {
        id
        project_id
        question_id
        type
        total
        index
        title
        titleLabel
        selected
        design_settings
        Question {
            id
            name
            type
            description
            instructions
            otherOptionText
            project_id
            Choices {
              id
              choice_value
            }
            question_type_config
        }
      }
    }
  `;

  return useGqlQuery(["visualizaitons"], query, {});
};

export const useFetchVisualizationGql = (id) => {
    const query = gql`
      query {
        Visualization(id: "${id}") {
            id
            project_id
            question_id
            type
            total
            index
            title
            titleLabel
            selected
            design_settings
            Question {
                id
                name
                type
                description
                instructions
                otherOptionText
                project_id
                Choices {
                  id
                  choice_value
                }
            }
        }
      }
    `;
  
    return useGqlQuery(["visualizaitons", id], query, {});
  };

export const useCreateVisualizationsGql = () => {
  const mutation = gql`
    mutation CreateVisualization(
        $project_id: ID!
        $question_id: ID!
        $type: String!
        $total: Int!
        $index: Int!
        $title: String!
        $titleLabel: String!
        $selected: Boolean!
        $design_settings: JSON!) {
      createRole(
        project_id: $project_id
        question_id: $question_id
        type: $type
        total: $total
        index: $index
        title: $title
        titleLabel: $titleLabel
        selected: $selected
        design_settings: $design_settings) {
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
      queryClient.invalidateQueries("visualizaitons");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateVisualizationsGql = () => {
  const mutation = gql`
  mutation UpdateVisualization(
    $id: ID!
    $project_id: ID
    $question_id: ID
    $type: String
    $total: Int
    $index: Int
    $title: String
    $titleLabel: String
    $selected: Boolean
    $design_settings: JSON) {
  UpdateRole(
    id: $id
    project_id: $project_id
    question_id: $question_id
    type: $type
    total: $total
    index: $index
    title: $title
    titleLabel: $titleLabel
    selected: $selected
    design_settings: $design_settings) {
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
      queryClient.invalidateQueries(["visualizaitons"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteVisualizationsGql = () => {
  const mutation = gql`
    mutation RemoveVisualization($id: ID!) {
      removeVisualization(id: $id) {
        id
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["visualizaitons"]);
    },
  };

  return useGqlMutation(mutation, options);
};
