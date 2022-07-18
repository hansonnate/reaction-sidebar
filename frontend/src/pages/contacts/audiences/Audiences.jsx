// External
import React, { useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/tables/BasicTable/ReactTable.jsx";
import styles from "./Audiences.module.scss";
// import ReactModal from "../../../components/ReactModal/ReactModal.jsx";
import { TextField, SaveForm, SelectField } from "components/inputs";


// Internal
// import { Header } from "components/layouts";
import { useCreateAudienceGql, useDeleteAudienceGql, useFetchAudiencesGql } from "api/resources/contacts/audiences";
// import { Label } from "components/layouts/Label/Label.jsx";
import { ContactCleaner } from "components/ContactCleaner/ContactCleaner.jsx";
import Editor from "components/tables/EditableTable/App.jsx";
import { DynamicUpload } from "components/DynamicUpload/DynamicUpload.jsx";
import Button from "components/buttons/Button/Button.jsx";
// import Header from "components/EditableTable/Header.jsx";

// Internal

export const Audiences = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Audience Name",
        accessor: "name",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Members",
        accessor: "members",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Modified",
        accessor: "modified_at",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Created",
        accessor: "created_at",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const fetchAudiencesQuery = useFetchAudiencesGql();
  const createAudienceQuery = useCreateAudienceGql();
  const deleteAudienceQuery = useDeleteAudienceGql();

  // const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [newAudience, setNewAudience] = useState(false);
  const [chosenOption, setChosenOption] = useState();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [audience, setAudience] = useState([]);

  const options = [
    { value: "dynamic", label: "Dynamic" },
    { value: "fileupload", label: "File Upload" },
    { value: "entermanually", label: "Enter Manual" },
  ];

  const onChange = (value) => {
    setChosenOption(value);
  };

  const finalButtons = () => {
    return (
      <div className={styles.finalbuttons}>
        <Button white>Preview Audience</Button>
        <Button onClick={handleCreateAudience}>Save Audience</Button>
      </div>
    );
  };

  const handleCreateAudience = () => {
    createAudienceQuery.mutate({
      name: newName,
      description: newDescription,
      members: audience.length,
      contact_ids: audience,
      created_at: "2020-01-01",
      modified_at: "2020-01-01",
    });
  };

  const deleteSelected = (selected) => {
    console.log(selected);
    for (let i = 0; i < selected.length; i++) {
      deleteAudienceQuery.mutate({
        id: selected[i].original.id,
      });
    }

  };


  return (
    <>
      {fetchAudiencesQuery.isLoading && <p>Loading...</p>}
      {fetchAudiencesQuery.isError && <p>{fetchAudiencesQuery.error}</p>}
      {fetchAudiencesQuery.isSuccess && newAudience === false && (
        <ReactTable
          columns={columns}
          data={fetchAudiencesQuery.data.allAudiences}
          buttonMethod={() => setNewAudience(true)}
          modalTitle="New Audience"
          deleteSelected={deleteSelected}
        />
      )}
      {newAudience && (
        <>
        <h1>New Audience</h1>
        <div className={styles.page}>
          <SaveForm
            fields={[
              {
                label: "Name",
                field: (
                  <TextField
                    value={newName}
                    placeholder="Audience Name"
                    onChange={(e) => (setNewName(e.target.value))}
                  ></TextField>
                ),
              },
              {
                label: "Description",
                field: (
                  <TextField
                    value={newDescription}
                    placeholder="Description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  ></TextField>
                ),
              },
              {
                label: "Type",
                field: (
                  <SelectField
                    options={options}
                    onChange={onChange}
                  ></SelectField>
                ),
              },
            ]}
          ></SaveForm>
          {chosenOption === "fileupload" && (
            <div>
              <ContactCleaner setList={() => setAudience}></ContactCleaner>
              {finalButtons()}
            </div>
          )}
          {chosenOption === "dynamic" && (
            <div>
              <DynamicUpload setList={() => setAudience}></DynamicUpload>
              {finalButtons()}
            </div>
          )}
          {chosenOption === "entermanually" && (
            <div>
              <Editor buttonName={"Upload"}></Editor>
              {finalButtons()}
            </div>
          )}
        </div>
        </>
      )}

    </>
  );
};
