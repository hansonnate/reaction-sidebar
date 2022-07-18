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
        create_project
        see_all_projects
        send_from_org_email
        send_survey
        see_surveys_where
        see_survey_results
        create_contacts_for_team
        edit_contacts
        create_audience
        can_edit_user_groups
        can_edit_users
        can_see_users
        can_create_user
        can_see_distribution_settings
        can_edit_org_details
        can_edit_distribution_settings
      }
    }
  `;

  return useGqlQuery(["roles"], query, {});
};

export const useCreateRolesGql = () => {
  const mutation = gql`
    mutation CreateRole(
      $organization_id: ID!
      $name: String!
      $description: String!
      $create_project: Boolean!
      $see_all_projects: Boolean!
      $send_from_org_email: Boolean!
      $send_survey: Boolean!
      $see_surveys_where: Boolean!
      $see_survey_results: Boolean!
      $create_contacts_for_team: Boolean!
      $edit_contacts: Boolean!
      $create_audience: Boolean!
      $can_edit_user_groups: Boolean!
      $can_edit_users: Boolean!
      $can_see_users: Boolean!
      $can_create_user: Boolean!
      $can_see_distribution_settings: Boolean!
      $can_edit_org_details: Boolean!
      $can_edit_distribution_settings: Boolean!) {
      createRole(
        organization_id: $organization_id, 
        name: $name, 
        description: $description, 
        create_project: $create_project,
        see_all_projects: $see_all_projects,
        send_from_org_email: $send_from_org_email,
        send_survey: $send_survey,
        see_surveys_where: $see_surveys_where,
        see_survey_results: $see_survey_results,
        create_contacts_for_team: $create_contacts_for_team,
        edit_contacts: $edit_contacts,
        create_audience: $create_audience,
        can_edit_user_groups: $can_edit_user_groups,
        can_edit_users: $can_edit_users,
        can_see_users: $can_see_users,
        can_create_user: $can_create_user,
        can_see_distribution_settings: $can_see_distribution_settings,
        can_edit_org_details: $can_edit_org_details,
        can_edit_distribution_settings: $can_edit_distribution_settings
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
      queryClient.invalidateQueries("roles");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateRolesGql = () => {
  const mutation = gql`
    mutation UpdateRole(
      $id: ID!
      $organization_id: ID
      $name: String
      $description: String
      $create_project: Boolean
      $see_all_projects: Boolean
      $send_from_org_email: Boolean
      $send_survey: Boolean
      $see_surveys_where: Boolean
      $see_survey_results: Boolean
      $create_contacts_for_team: Boolean
      $edit_contacts: Boolean
      $create_audience: Boolean
      $can_edit_user_groups: Boolean
      $can_edit_users: Boolean
      $can_see_users: Boolean
      $can_create_user: Boolean
      $can_see_distribution_settings: Boolean
      $can_edit_org_details: Boolean
      $can_edit_distribution_settings: Boolean
    ) {
      updateRole(       
        id: $id,
        organization_id: $organization_id, 
        name: $name, 
        description: $description, 
        create_project: $create_project,
        see_all_projects: $see_all_projects,
        send_from_org_email: $send_from_org_email,
        send_survey: $send_survey,
        see_surveys_where: $see_surveys_where,
        see_survey_results: $see_survey_results,
        create_contacts_for_team: $create_contacts_for_team,
        edit_contacts: $edit_contacts,
        create_audience: $create_audience,
        can_edit_user_groups: $can_edit_user_groups,
        can_edit_users: $can_edit_users,
        can_see_users: $can_see_users,
        can_create_user: $can_create_user,
        can_see_distribution_settings: $can_see_distribution_settings,
        can_edit_org_details: $can_edit_org_details,
        can_edit_distribution_settings: $can_edit_distribution_settings
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
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteRoleGql = () => {
  const mutation = gql`
    mutation RemoveRole($id: ID!) {
      removeRole(id: $id) {
        id
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    },
  };

  return useGqlMutation(mutation, options);
};
