// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
// import { TextField } from "components/inputs";
import styles from "./AccessGroups.module.scss";
// import { InputContainer } from "components/layouts/InputContainer/InputContainer";
// import { Label } from "components/layouts/Label/Label";
import TeamsList, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/TeamsList/TeamsList.jsx";
import { useFetchContacts } from "api/resources/contacts/contacts";
import { useFetchAccessGroupsGql, useCreateAccessGroupGql, useUpdateAccessGroupGql } from "api/resources/organization/accessgroups";
import { useToken } from "components/Login/Login";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";

// Internal

export const AccessGroups = () => {
  const { token } = useToken();
  const fetchContactsQuery = useFetchContacts();
  const fetchGroupsQuery = useFetchAccessGroupsGql(token);
  const createAccessGroupQuery = useCreateAccessGroupGql();
  const updateAccessGroupQuery = useUpdateAccessGroupGql();
  

  const handlePostAccessGroup = () => {
    createAccessGroupQuery.mutate({
      input: {
        name: "staff",
        // description: description,
      },
      token: token
    }
    );
  };
  /* eslint-disable no-unused-vars */
  const handleUpdateAccessGroup = (name, description, whiteId, blackId) => {
    updateAccessGroupQuery.mutate({
      input: {
        id: currRole.id,
        token: token,
        name: name,
        description: description,
        whitelistUserIds: whiteId,
        blacklistUserIds: blackId,

      }
    }
    );
  };

  const handleActiveUpdate = (id) => {
    console.log(id);
    setActive(id);
    for (let i = 0; i < fetchGroupsQuery.data.accessgroups.length; i++) {
      if (fetchGroupsQuery.data.accessgroups[i].id === id) {
        setCurrRole(fetchGroupsQuery.data.accessgroups[i]);
      }
    }
  };
  const handleSetName = (name) => {
    currRole.name = name;
    console.log(currRole);
  };

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
  const [currRole, setCurrRole] = useState(0);
  const [active, setActive] = useState();

  return (
    <>
      {fetchGroupsQuery.isLoading && <p>Loading...</p>}
      {fetchGroupsQuery.isError && <p>Error</p>}
      {fetchGroupsQuery.isSuccess && (
        <SplitHorizontal leftShrink divider fullHeight>
          <UGSidebar
            menuItems={fetchGroupsQuery.data.accessgroups}
            active={active}
            updateActive={handleActiveUpdate}
            type="Team"
            handlePostAccessGroup={handlePostAccessGroup}
          />

          <div className={styles.page}>
            {active && (
              <>
                <div className={styles.container}>
                  {/* <InputContainer>
                    <Label>Name</Label>
                    <TextField
                      placeholder="Role Name"
                      value={currRole.name}
                      onSave={handleSetName}
                    ></TextField>
                  </InputContainer>
                  <InputContainer>
                    <Label>Description</Label>
                    <TextField
                      placeholder="Role Name"
                      value={"A description"}
                      onSave={handleSetName}
                    ></TextField>
                  </InputContainer> */}
                  <Form handleUpdate={() => handleUpdateAccessGroup}>
                    <input name="name" label="Name" type="text" placeholder="type here..." defaultValue={currRole.name}></input>
                    <input name="description" label="Description" type="text" placeholder="type here..." defaultValue={currRole.description}></input>

                  </Form>
                </div>

                <>
                  <TeamsList
                    columns={columns}
                    data={fetchContactsQuery.data}
                    title="White List"
                  />
                  <TeamsList
                    columns={columns}
                    data={fetchContactsQuery.data}
                    title="Black List"
                  />
                </>
              </>
            )}
          </div>
        </SplitHorizontal>
      )}
    </>
  );
};
