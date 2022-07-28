// External
import React, { useState } from "react";
// import ReactTable, {
//   SelectColumnFilter,
//   MultipleFilter,
// } from "components/tables/BasicTable/ReactTable.jsx";
import styles from "./Audiences.module.scss";
// import ReactModal from "../../../components/ReactModal/ReactModal.jsx";
import { TextField, SaveForm, SelectField } from "components/inputs";

// Internal
// import { Header } from "components/layouts";
import {
  useCreateAudienceGql,
  useDeleteAudienceGql,
  useFetchAudiencesGql,
} from "api/resources/contacts/audiences";
// import { Label } from "components/layouts/Label/Label.jsx";
import { ContactCleaner } from "components/ContactCleaner2.0/ContactCleaner";
import Editor from "components/tables/EditableTable/App.jsx";
import { DynamicUpload } from "components/DynamicUpload/DynamicUpload.jsx";
import Button from "components/buttons/Button/Button.jsx";
import { useCreateManyContactGql } from "api/resources/contacts/contacts";
import Table from "components/tables/Table/Table";
import { useNavigate } from "react-router-dom";
// import Header from "components/EditableTable/Header.jsx";

// Internal

export const Audiences = () => {
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Audience Name",
  //       accessor: "name",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Members",
  //       accessor: "members",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Modified",
  //       accessor: "modified_at",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Created",
  //       accessor: "created_at",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //   ],
  //   []
  // );

  //to be able to navigate to the project. onClick in the row
  let navigate = useNavigate();
  const routeChangePath = (path) => {
    // let path = `addContacts`;
    navigate(path);
  };
  const routeChange = (row) => {
    // console.log(path);
    navigate(row.id);
  };
  const headers = [
    {
      id: 0,
      name: "Audience",
      accessor: "name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 1,
      name: "Members",
      accessor: "members",
      enabled: true,
      cell_style: null,
    },
    {
      id: 2,
      name: "Modified",
      accessor: "modified_at",
      enabled: true,
      cell_style: null,
    },
    {
      id: 3,
      name: "Created",
      accessor: "created_at",
      enabled: true,
      cell_style: null,
    },
  ];

  const fetchAudiencesQuery = useFetchAudiencesGql();
  const createAudienceQuery = useCreateAudienceGql();
  const deleteAudienceQuery = useDeleteAudienceGql();
  const createManyContact = useCreateManyContactGql();

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

  function refreshPage() {
    window.location.reload(false);
  }

  const finalButtons = () => {
    return (
      <div className={styles.finalbuttons}>
        <Button white>Preview Audience</Button>
        <Button onClick={handleCreateAudience}>Save Audience</Button>
      </div>
    );
  };
  function shortId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  function handleCreateAudience(data) {
    if (data.length > 0) {
      //if there is no data don't do anything and prompt user to add a new row for contacts
      // console.log(data);
      let contacts = [];
      //take the given contacts and format them to be right for the query
      data.map((contact) => {
        contacts.push({
          id: shortId(),
          organization_id: "0684348415",
          survey_participation_count: 0,
          survey_completion_count: 0,
          survey_noncompletion_count: 0,
          last_surveyed_at: "never",
          created_at: "2020-01-01",
          updated_at: "2020-01-01",
          prefix: contact.prefix,
          first_name: contact.firstName,
          middle_name: contact.middleName ? contact.middleName : "none",
          last_name: contact.lastName,
          email: contact.email,
          gender: contact.gender ? contact.gender : "none",
          locale: contact.locale ? contact.locale : "en",
          company: contact.company,
          position: contact.position,
          position_category: contact.positioncategory
            ? contact.positioncategory
            : "none",
          date_of_birth: contact.dateofbirth ? contact.dateofbirth : "none",
          last_survey_completed: "never",
          last_survey_invitation: "never",
        });
      });
      //create contacts and add them to database
      createManyContact.mutate({
        data: contacts,
      });
      if (createManyContact.isLoading) {
        console.log("Loading");
      }
      let arrayOfIds = [];
      if (createManyContact.isSuccess) {
        for (
          let i = 0;
          i < createManyContact.data.createManyContact.length;
          i++
        ) {
          arrayOfIds.push(createManyContact.data.createManyContact[i].id);
        }
        console.log(arrayOfIds);
        setAudience(arrayOfIds);
        console.log(audience);
      }
      //create the audience and add to database
      createAudienceQuery.mutate({
        name: newName,
        description: newDescription,
        members: arrayOfIds.length,
        contact_ids: arrayOfIds,
        created_at: "2020-01-01",
        modified_at: "2020-01-01",
        type: "static",
      });
      if (createAudienceQuery.isSuccess) {
        refreshPage();
      }
    } else {
      alert("Click + New to add a new row");
    }
  }

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
        <>
          <Table
            initHeaders={headers}
            data={fetchAudiencesQuery.data.allAudiences}
            createMethod={() => setNewAudience(true)}
            createTitle="New Audience"
            deleteSelected={deleteSelected}
            onRowClick={routeChange}
            search="project"
            // setPageNumber={handlePageChange}
            pageNumber={1}
            bottomLeft={<Button blue onClick={() => routeChangePath("/contacts/previous-imports")}>Previous Imports</Button>}
          />
          <div className={styles.footer}>
            <i className="bi bi-life-preserver"></i> Need Help?{" "}
            <a href="">Learn More</a> about creating audiences
          </div>
        </>
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
                      onChange={(e) => setNewName(e.target.value)}
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
                <Editor
                  buttonName={"Save Audience"}
                  setList={handleCreateAudience}
                ></Editor>
                {/* {finalButtons()} */}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
