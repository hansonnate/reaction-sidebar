// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Roles.module.scss";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
import {
  useCreateRolesGql,
  useDeleteRoleGql,
  useFetchRolesGql,
  useUpdateRolesGql,
} from "api/resources/organization/roles";

// Internal

export const Roles = () => {

  const fetchRolesQuery = useFetchRolesGql();
  const createRoles = useCreateRolesGql();
  const updateRole = useUpdateRolesGql();
  const deleteRole = useDeleteRoleGql();
  const [currRole, setCurrRole] = useState();
  const [active, setActive] = useState(0);

  const handleActiveUpdate = (id) => {
    console.log(id);
    setActive(id);
    for (let i = 0; i < fetchRolesQuery.data.allRoles.length; i++) {
      if (fetchRolesQuery.data.allRoles[i].id === id) {
        setCurrRole(fetchRolesQuery.data.allRoles[i]);
        console.log(currRole);
      }
    }

    
  };
  const handleNewRole = () => {
    createRoles.mutate({
      organization_id: "0684348415",
      name: "New Role",
      description: "New Permissions",
      permissions: [
        {
          name: "Projects",
          create_survey: true,
          see_all_surveys: true,
          send_from_org_email: true,
          send_survey: true,
          see_surveys_where: true,
          see_survey_results: true,
        },
        {
          name: "Contacts",
          create_contacts_for_team: true,
          edit_contacts: true,
          create_audience: true,
        },
        {
          name: "Organization",
          can_edit_user_groups: true,
          can_edit_users: true,
          can_see_users: true,
          can_create_user: true,
          can_see_distribution_settings: true,
          can_edit_org_details: true,
        },
        {
          name: "Distribution",
          can_edit_distribution_settings: true,
        },
      ],
    });
  };

  const onSave = (data) => {
    updateRole.mutate({
      id: currRole.id,
      organization_id: "0684348415",
      name: data.name,
      description: data.description,
      permissions: [
        {
          name: "Projects",
          create_survey: data.create_survey,
          see_all_surveys: data.see_all_surveys,
          send_from_org_email: data.send_from_org_email,
          send_survey: data.send_survey,
          see_surveys_where: data.see_surveys_where,
          see_survey_results: data.see_survey_results,
        },
        {
          name: "Contacts",
          create_contacts_for_team: data.create_contacts_for_team,
          edit_contacts: data.edit_contacts,
          create_audience: data.create_audience,
        },
        {
          name: "Organization",
          can_edit_user_groups: data.can_edit_user_groups,
          can_edit_users: data.can_edit_users,
          can_see_users: data.can_see_users,
          can_create_user: data.can_create_user,
          can_see_distribution_settings: data.can_see_distribution_settings,
          can_edit_org_details: data.can_edit_org_details,
        },
        {
          name: "Distribution",
          can_edit_distribution_settings: data.can_edit_distribution_settings,
        },
      ],
    });
  };

  const onDelete = () => {
    deleteRole.mutate({
      id: currRole.id,
    });
  }

  return (
    <>
      {fetchRolesQuery.isLoading && <p>Loading...</p>}
      {fetchRolesQuery.isError && <p>Error</p>}
      {fetchRolesQuery.isSuccess && (
        <>
          <SplitHorizontal className="flex-grow" leftShrink divider fullHeight>
            {/* {console.log(fetchRolesQuery.data.allRoles)} */}
            <UGSidebar
              menuItems={fetchRolesQuery.data.allRoles}
              active={active}
              updateActive={handleActiveUpdate}
              onNewClick={handleNewRole}
              type="Role"
            />
            <div className={`flex-grow-1 ${styles.page}`}>
              {currRole !== undefined && (
                <Form onSave={onSave} onDelete={onDelete}>
                  <TextField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="type here..."
                    value={currRole.name}
                  ></TextField>
                  <TextField
                    name="description"
                    label="Description"
                    type="text"
                    placeholder="type here..."
                    value={currRole.description}
                  ></TextField>
                  <UGAccordion
                    name="permissions"
                    label="Name"
                    type="accordion"
                    data={currRole.permissions}
                  ></UGAccordion>
                </Form>
              )}
            </div>
          </SplitHorizontal>
        </>
      )}
    </>
  );
};
