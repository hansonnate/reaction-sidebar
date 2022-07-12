// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./AccessGroups.module.scss";
import TeamsList, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/TeamsList/TeamsList.jsx";
// import { useFetchContacts } from "api/resources/contacts/contacts";
import { useFetchAccessGroupsGql, useCreateAccessGroupGql, useUpdateAccessGroupGql, useDeleteAccessGroupGql } from "api/resources/organization/accessgroups";
// import { useToken } from "components/Login/Login";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";

// Internal

export const AccessGroups = () => {
  // const { token } = useToken();
  // const fetchContactsQuery = useFetchContacts();
  const fetchGroupsQuery = useFetchAccessGroupsGql();
  const createAccessGroupQuery = useCreateAccessGroupGql();
  const updateAccessGroupQuery = useUpdateAccessGroupGql();
  const deleteAccessGroupQuery = useDeleteAccessGroupGql();

  const handlePostAccessGroup = () => {
    createAccessGroupQuery.mutate({
      organization_id: "0684348415",
      name: "New Group",
      description: "New Lists",
      whitelist_user_ids: [],
      blacklist_user_ids: [], 
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
    }
    );
  };
  /* eslint-disable no-unused-vars */
 

  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "First Name",
        accessor: "firstname",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Last Name",
        accessor: "lastname",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Position",
        accessor: "position",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Company",
        accessor: "company",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  console.log(fetchGroupsQuery);
  const [currRole, setCurrRole] = useState();
  const [active, setActive] = useState();

  const handleActiveUpdate = (id) => {
    // debugger; // eslint-disable-line no-debugger
    console.log(id);
    setActive(id);
    for (let i = 0; i < fetchGroupsQuery.data.allAccessgroups.length; i++) {
      if (fetchGroupsQuery.data.allAccessgroups[i].id === id) {
        setCurrRole(fetchGroupsQuery.data.allAccessgroups[i]);
        console.log(currRole);
      }
    }
  };

  const onSave = (data) => {
    updateAccessGroupQuery.mutate({
      id: currRole.id,
      organization_id: "0684348415",
      name: data.name,
      description: data.description,
    });
  };

  const onDelete = () => {
    deleteAccessGroupQuery.mutate({
      id: currRole.id,
    });
  }

  return (
    <>
      {fetchGroupsQuery.isLoading && <p>Loading...</p>}
      {fetchGroupsQuery.isError && <p>Error</p>}
      {fetchGroupsQuery.isSuccess && (
        <SplitHorizontal leftShrink divider fullHeight>
    
          <UGSidebar
            menuItems={fetchGroupsQuery.data.allAccessgroups}
            active={active}
            updateActive={handleActiveUpdate}
            type="Team"
            onNewClick={handlePostAccessGroup}
          />

          <div className={styles.page}>
            {active && (
              <>
                <div className={styles.container}>
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
                  <TeamsList
                    type="userlist"
                    columns={columns}
                    data={currRole.whitelist_user_ids}
                    title="White List"
                  />
                  <TeamsList
                    type="userlist"
                    columns={columns}
                    data={currRole.blacklist_user_ids}
                    title="Black List"
                  />
                  </Form>
                </div>

                {/* <>

                </> */}
              </>
            )}
          </div>
        </SplitHorizontal>
      )}
    </>
  );
};
