// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Roles.module.scss";
// import { InputContainer } from "components/layouts/InputContainer/InputContainer";
// import { Label } from "components/layouts/Label/Label";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
import {
  useCreateRolesGql,
  useFetchRolesGql,
  useUpdateRolesGql,
} from "api/resources/organization/roles";
// import { useNavigate } from "react-router-dom";

// Internal

export const Roles = () => {
  // const menuItems = [
  //   {
  //     id: 0,
  //     name: "Admin",
  //     to: "admin",
  //     description: "Full access",
  //     type: "role",
  //     permissions: [
  //       {
  //         name: "Projects",
  //         createSurvey: true,
  //         seeAllSurveys: true,
  //         sendFromOrgEmail: false,
  //         sendSurvey: false,
  //         seeSurveysWhere: false,
  //         seeSurveyResults: false,
  //       },
  //       {
  //         name: "Contacts",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Organization",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Distribution",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     name: "Staff",
  //     to: "staff",
  //     description: "Limited access",
  //     type: "role",
  //     permissions: [
  //       {
  //         name: "Projects",
  //         createSurvey: true,
  //         seeAllSurveys: true,
  //         sendFromOrgEmail: false,
  //         sendSurvey: false,
  //         seeSurveysWhere: false,
  //         seeSurveyResults: false,
  //       },
  //       {
  //         name: "Contacts",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Organization",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Distribution",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Account Manager",
  //     to: "accountmanager",
  //     description: "Regular access",
  //     type: "role",
  //     permissions: [
  //       {
  //         name: "Projects",
  //         createSurvey: true,
  //         seeAllSurveys: true,
  //         sendFromOrgEmail: false,
  //         sendSurvey: false,
  //         seeSurveysWhere: false,
  //         seeSurveyResults: false,
  //       },
  //       {
  //         name: "Contacts",
  //         createContactsForTeam: true,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Organization",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //       {
  //         name: "Distribution",
  //         createContactsForTeam: false,
  //         editContacts: false,
  //         createAudience: false,
  //       },
  //     ],
  //   },
  // ];
  // const permissions = [
  //   {
  //     name: "Projects",
  //     createSurvey: true,
  //     seeAllSurveys: true,
  //     sendFromOrgEmail: false,
  //     sendSurvey: false,
  //     seeSurveysWhere: false,
  //     seeSurveyResults: false,
  //   },
  //   {
  //     name: "Contacts",
  //     createContactsForTeam: false,
  //     editContacts: false,
  //     createAudience: false,
  //   },
  //   {
  //     name: "Organization",
  //     createContactsForTeam: false,
  //     editContacts: false,
  //     createAudience: false,
  //   },
  //   {
  //     name: "Distribution",
  //     createContactsForTeam: false,
  //     editContacts: false,
  //     createAudience: false,
  //   },
  // ];

  const fetchRolesQuery = useFetchRolesGql();
  const createRoles = useCreateRolesGql();
  const updateRole = useUpdateRolesGql();
  const [currRole, setCurrRole] = useState();
  // const [items, setItems] = useState();
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
          createSurvey: true,
          seeAllSurveys: false,
          sendFromOrgEmail: false,
          sendSurvey: false,
          seeSurveysWhere: false,
          seeSurveyResults: false,
        },
        {
          name: "Contacts",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Organization",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Distribution",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
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
          createSurvey: data.Projects_createSurvey,
          seeAllSurveys: data.Projects_seeAllSurveys,
          sendFromOrgEmail: data.Projects_sendFromOrgEmail,
          sendSurvey: data.Projects_sendSurvey,
          seeSurveysWhere: data.Projects_seeSurveysWhere,
          seeSurveyResults: data.Projects_seeSurveyResults,
        },
        {
          name: "Contacts",
          createContactsForTeam: data.Contacts_createContactsForTeam,
          editContacts: data.Contacts_editContacts,
          createAudience: data.Contacts_createAudience,
        },
        {
          name: "Organization",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Distribution",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
      ],
    });
  };

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
                <Form onSave={onSave}>
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
