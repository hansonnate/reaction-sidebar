// External
import React, { useState } from "react";
import { UGSidebar } from "components/sidebars/UGSidebar/UGSidebar";
import { SplitHorizontal } from "components/layouts";
import { TextField } from "components/inputs";
import styles from "./Teams.module.scss";
import { InputContainer } from "components/layouts/InputContainer/InputContainer";
import { Label } from "components/layouts/Label/Label";
import TeamsList, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/TeamsList/TeamsList.jsx";
import { useFetchContacts } from "api/resources/contacts/contacts";

// Internal

export const Teams = () => {
  const menuItems = [
    {
      id: 0,
      name: "No Jeremy",
      to: "nojeremy",
      description: "Jeremy shall be excluded",
      type: "team",
    },
  ];

  const [currRole, setCurrRole] = useState(menuItems[0]);
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  const handleSetCurrRole = (role) => {
    setCurrRole(role);
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

  const fetchContactsQuery = useFetchContacts();

  return (
    <>
      <SplitHorizontal leftShrink divider fullHeight>
        <UGSidebar
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
          updateCurrRole={handleSetCurrRole}
          type="Team"
        />
        <div className={styles.page}>
          <div className={styles.container}>
            <InputContainer>
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
                value={currRole.description}
                onSave={handleSetName}
              ></TextField>
            </InputContainer>
          </div>
          {fetchContactsQuery.isLoading && <p>Loading...</p>}
          {fetchContactsQuery.isError && <p>{fetchContactsQuery.error}</p>}
          {fetchContactsQuery.isSuccess && (
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
          )}
        </div>
      </SplitHorizontal>
    </>
  );
};
