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
import { useFetchAudiencesGql } from "api/resources/contacts/audiences";
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
        accessor: "modified",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Created",
        accessor: "created",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const fetchAudiencesQuery = useFetchAudiencesGql();

  // const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [newAudience, setNewAudience] = useState(false);
  const [chosenOption, setChosenOption] = useState();

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
        <Button>Save Audience</Button>
      </div>
    );
  };

  return (
    <>
      {fetchAudiencesQuery.isLoading && <p>Loading...</p>}
      {fetchAudiencesQuery.isError && <p>{fetchAudiencesQuery.error}</p>}
      {fetchAudiencesQuery.isSuccess && newAudience === false && (
        <ReactTable
          columns={columns}
          data={fetchAudiencesQuery.data}
          buttonMethod={() => setNewAudience(true)}
          modalTitle="New Audience"
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
                    // value={displayName}
                    placeholder="Audience Name"
                    // onSave={updateTitle}
                  ></TextField>
                ),
              },
              {
                label: "Description",
                field: (
                  <TextField
                    // value={displayName}
                    placeholder="Description"
                    // onSave={updateTitle}
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
          {/* <div className={styles.legistics}>
            <div className={styles.legistic}>
              <Label>Name</Label>
              <TextField placeholder="Audience Name"></TextField>
            </div>
            <div className={styles.legistic}>
              <Label>Description</Label>
              <TextField placeholder="Description"></TextField>
            </div>
            <div className={styles.legistic}>
              <Label>Type</Label>
              <SelectField options={options} onChange={onChange}></SelectField>
            </div>
          </div> */}
          {chosenOption === "fileupload" && (
            <div>
              <ContactCleaner></ContactCleaner>
              {finalButtons()}
            </div>
          )}
          {chosenOption === "dynamic" && (
            <div>
              <DynamicUpload></DynamicUpload>
              {finalButtons()}
            </div>
          )}
          {chosenOption === "entermanually" && (
            <div>
              <Editor></Editor>
              {finalButtons()}
            </div>
          )}
        </div>
        </>
      )}

      {/* <ReactModal show={show} onClose={() => setShow(false)}>
        <div className="content">
          <h1>Create Audience</h1>
          <div className={styles.text}>
            <TextField
              type="text"
              placeholder="Audience Name"
            ></TextField>
            <TextField
              type="text"
              placeholder="Description (optional)"
            ></TextField>
            
          </div>
        </div>
      </ReactModal>  */}
    </>
  );
};
