// External
import React, { useState } from "react";
// import JoditEditor from "jodit-react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/BasicTable/ReactTable.jsx";
import styles from "./Email.module.scss";
import DistributionModal from "components/ReactModal/DistributionModal.jsx";
import { TextField } from "components/inputs";
import { useParams } from "react-router-dom";
import { useFetchProject } from "api/resources/projects/projects";
import Select from "react-select";
// import { TextEdit } from "components/inputs/input_fields/TextEdit/TextEdit";
import TextEditor from "components/inputs/input_fields/TextEditor";
import "draft-js/dist/Draft.css";
// Internal
import {
  // useCreateProject,
  useFetchProjects,
} from "api/resources/projects/projects";
import { useFetchAudiences } from "api/resources/contacts/audiences";

function isOpen(value) {
  if (value.value == "Bad") {
    return true;
  } else {
    return false;
  }
}

export const Email = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const fetchAudiencesQuery = useFetchAudiences();

  const { id } = useParams();
  const projectQuery = useFetchProject(id);
  console.log(projectQuery.data);
  const columns = React.useMemo(
    () => [
      {
        Header: "Subject",
        accessor: "subject",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Audience",
        accessor: "audience",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "From",
        accessor: "from",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Strength",
        accessor: "strength",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        Cell: (e) => (
          <span
            className={`${styles.status} ${
              isOpen(e) ? `${styles.isopen}` : `${styles.isclosed}`
            }`}
          >
            {e.value}{" "}
          </span>
        ),
      },
    ],
    []
  );

  const fetchProjectsQuery = useFetchProjects();
  console.log(fetchProjectsQuery.data);

  const [show, setShow] = useState(false);

  return (
    <>
      {fetchAudiencesQuery.isLoading && <p>Loading...</p>}
      {fetchAudiencesQuery.isError && <p>{fetchAudiencesQuery.error}</p>}
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>{fetchProjectsQuery.error}</p>}
      {fetchProjectsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={projectQuery.data.emails}
          buttonMethod={() => setShow(true)}
          modalTitle="Compose Email"
        />
      )}
      <DistributionModal show={show} onClose={() => setShow(false)}>
        <div className={styles.content}>
          <h1>Compose Email</h1>
          <div className={styles.distibutionform}>
            <div className={styles.formfield}>
              <label>Audience</label>
              <div className={styles.selectfield}>
              {fetchAudiencesQuery.isSuccess &&
                <Select options={fetchAudiencesQuery.data}></Select>
              }
              </div>
            </div>
            <div className={styles.formfield}>
              <label>From</label>
              <div className={styles.selectfield2}>
                <Select options={options}></Select>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Subject</label>
              <div className={styles.textfield}>
                <TextField placeholder="New Subject"></TextField>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Email Body</label>
              <div className={styles.textfield}>
                <TextEditor></TextEditor>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Schedule Send</label>
              <div className={styles.selectfield}>
                <Select
                  options={options}
                  placeholder="Schedule Options..."
                ></Select>
              </div>
            </div>
            <div className={styles.footer}>
              <button
                className={styles.darkbutton}
                onClick={() => setShow(false)}
              >
                Close
              </button>

              <div className={styles.specialbuttons}>
                <button className={styles.lightbutton}>Save as draft</button>
                <button className={styles.darkbutton}>Schedule Send</button>
              </div>
            </div>
          </div>
        </div>
      </DistributionModal>
    </>
  );
};
