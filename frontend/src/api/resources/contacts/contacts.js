// External
import { useQueryClient } from "react-query";
import { gql } from "graphql-request";

// Internal
import { useGqlQuery, useGqlMutation } from "api/Api";

// GRAPHQL API

export const useFetchContacts = (page, perPage) => {
  const query = gql`
    query {
      allContacts(page: ${page}, perPage: ${perPage}) {
        id
        first_name
        last_name
        email
        gender
        company
        position
        position_category
      }
    }
  `;

  return useGqlQuery(["contacts"], query, {});
};

export const useFetchContactGql = (id) => {
  const query = gql`
    query {
        Contact(id: "${id}") {
        id
        email
      }
    }
  `;

  return useGqlQuery(["emails", id], query, {});
};

export const useCreateContactGql = () => {
  const mutation = gql`
    mutation CreateContact(
      $organization_id: ID!
      $survey_participation_count: Int!
      $survey_completion_count: Int!
      $survey_noncompletion_count: Int!
      $last_surveyed_at: String!
      $created_at: String!
      $updated_at: String!
      $prefix: String
      $first_name: String!
      $middle_name: String!
      $last_name: String!
      $email: String!
      $gender: String!
      $locale: String!
      $company: String!
      $position: String!
      $position_category: String!
      $date_of_birth: String!
      $last_survey_completed: String!
      $last_survey_invitation: String!
    ) {
      createContact(
        organization_id: $organization_id
        survey_participation_count: $survey_participation_count
        survey_completion_count: $survey_completion_count
        survey_noncompletion_count: $survey_noncompletion_count
        last_surveyed_at: $last_surveyed_at
        created_at: $created_at
        updated_at: $updated_at
        prefix: $prefix
        first_name: $first_name
        middle_name: $middle_name
        last_name: $last_name
        email: $email
        gender: $gender
        locale: $locale
        company: $company
        position: $position
        position_category: $position_category
        date_of_birth: $date_of_birth
        last_survey_completed: $last_survey_completed
        last_survey_invitation: $last_survey_invitation
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
      queryClient.invalidateQueries("contacts");
    },
  };

  return useGqlMutation(mutation, options);
};
export const useCreateManyContactGql = () => {
  const mutation = gql`
    mutation CreateManyContact($data: [ContactInput]) {
      createManyContact(data: $data) {
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
      queryClient.invalidateQueries("contacts");
    },
  };

  return useGqlMutation(mutation, options);
};

export const useUpdateContactGql = () => {
  const mutation = gql`
    mutation UpdateContact(
      $id: ID!
      $organization_id: ID
      $survey_participation_count: Int
      $survey_completion_count: Int
      $survey_noncompletion_count: Int
      $last_surveyed_at: String
      $created_at: String
      $updated_at: String
      $prefix: String
      $first_name: String
      $middle_name: String
      $last_name: String
      $email: String
      $gender: String
      $locale: String
      $company: String
      $position: String
      $position_category: String
      $date_of_birth: String
      $last_survey_completed: String
      $last_survey_invitation: String
    ) {
      updateContact(
        organization_id: $organization_id
        survey_participation_count: $survey_participation_count
        survey_completion_count: $survey_completion_count
        survey_noncompletion_count: $survey_noncompletion_count
        last_surveyed_at: $last_surveyed_at
        created_at: $created_at
        updated_at: $updated_at
        prefix: $prefix
        first_name: $first_name
        middle_name: $middle_name
        last_name: $last_name
        email: $email
        gender: $gender
        locale: $locale
        company: $company
        position: $position
        position_category: $position_category
        date_of_birth: $date_of_birth
        last_survey_completed: $last_survey_completed
        last_survey_invitation: $last_survey_invitation
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
      queryClient.invalidateQueries(["contacts"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useDeleteContactGql = () => {
  const mutation = gql`
    mutation RemoveContact($id: ID!) {
      removeContact(id: $id) {
        id
      }
    }
  `;
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  };

  return useGqlMutation(mutation, options);
};

export const useCreateContactImportGql = () => {
  const mutation = gql`
    mutation CreateContactImport(
      $organization_id: ID!
      $user_id: ID!
      $clean_contacts: JSON!
      $bad_contacts: JSON!
      $duplicates: JSON!
      $total_warnings: Int!
      $status: String!
      $uploaded_at: String!
      $type: String!
      $audience: String!
    ) {
      createContactimport(
        organization_id: $organization_id
        user_id: $user_id
        clean_contacts: $clean_contacts
        bad_contacts: $bad_contacts
        duplicates: $duplicates
        total_warnings: $total_warnings
        status: $status
        uploaded_at: $uploaded_at
        audience: $audience
        type: $type
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
      queryClient.invalidateQueries("contacts");
    },
  };
  return useGqlMutation(mutation, options);
};

export const useFetchContactImportGql = (id) => {
  const query = gql`
    query {
        Contactimport(id: "${id}") {
          id
          organization_id
          clean_contacts
          bad_contacts
          duplicates
          total_warnings
          status
          uploaded_at
          audience
          type
          User {
            firstname
            lastname
            id
          }
      }
    }
  `;
  return useGqlQuery(["contactimports", id], query, {});
};

export const useFetchContactImportsGql = () => {
  const query = gql`
    query {
      allContactimports {
        id
        organization_id
        clean_contacts
        bad_contacts
        duplicates
        total_warnings
        status
        uploaded_at
        type
        audience
        User {
          firstname
          lastname
          id
        }
      }
    }
  `;

  return useGqlQuery(["contactimports"], query, {});
};

export const useUpdateContactImportGql = () => {
  const mutation = gql`
    mutation UpdateContactImport(
      $id: ID!
      $organization_id: ID!
      $user_id: ID!
      $clean_contacts: JSON!
      $bad_contacts: JSON!
      $duplicates: JSON!
      $total_warnings: Int!
      $status: String!
      $uploaded_at: String!
      $audience: String!
      $type: String!
    ) {
      updateContactimport(
        id: $id
        organization_id: $organization_id
        user_id: $user_id
        clean_contacts: $clean_contacts
        bad_contacts: $bad_contacts
        duplicates: $duplicates
        total_warnings: $total_warnings
        status: $status
        uploaded_at: $uploaded_at
        audience: $audience
        type: $type
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
      queryClient.invalidateQueries("contactimports");
    },
  };
  return useGqlMutation(mutation, options);
};