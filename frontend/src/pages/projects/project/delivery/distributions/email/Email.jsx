// External
import React, { useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/BasicTable/ReactTable.jsx";
import styles from "./Email.module.scss";
import DistributionModal from "components/ReactModal/DistributionModal.jsx";
import ReactInput from "components/ReactInput/ReactInput.jsx";
import { useParams } from "react-router-dom";
import { useFetchProject } from "api/resources/projects/projects";
import Select from "react-select";

// Internal
import {
  // useCreateProject,
  useFetchProjects,
} from "api/resources/projects/projects";

function isOpen(value) {
  if (value.value == "Bad") {
    return true;
  } else {
    return false;
  }
}

export const Email = () => {
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

  // const getProjects = useApi(ProjectsApi.getProjects);
  // const postProject = useApi(ProjectsApi.postProject);

  const fetchProjectsQuery = useFetchProjects();
  // const createProjectQuery = useCreateProject();
  console.log(fetchProjectsQuery.data);

  // useEffect(() => {
  //   getProjects.request();
  // }, []);

  const [show, setShow] = useState(false);

  // const handlePostProject = (
  //   projectName,
  //   owner,
  //   status,
  //   responses,
  //   created,
  //   modified,
  //   description
  // ) => {
  //   createProjectQuery.mutate({
  //     name: projectName,
  //     owner: owner,
  //     status: status,
  //     responses: responses,
  //     created: created,
  //     modified: modified,
  //     description: description,
  //   });
  // };

  return (
    <>
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>{fetchProjectsQuery.error}</p>}
      {/* {getProjects.data?.map((project) => (
      {projectsQuery.isLoading && <p>Loading...</p>}
      {projectsQuery.isError && <p>{projectsQuery.error}</p>}
      {projectsQuery.data?.map((project) => (
        <div key={project.id}>
          <Link to={`${project.id}/`}>{project.name}</Link>
        </div>
        
      ))} */}
      {fetchProjectsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={projectQuery.data.emails}
          buttonMethod={() => setShow(true)}
          modalTitle="Compose Email"
        />
      )}
      <DistributionModal
        show={show}
        onClose={() => setShow(false)}
        // onSave={() => {
        //   handlePostProject(
        //     projectName,
        //     "Jack Sparrow",
        //     "Closed",
        //     0,
        //     Date.now(),
        //     Date.now(),
        //     description
        //   );
        //   setShow(false);
        // }}
      >
        <div className={styles.content}>
          <h1>Compose Email</h1>
          <div className={styles.distibutionform}>
            <div className={styles.formfield}>
              <label>Audience</label>
              <div className={styles.selectfield}>
                <Select options=""></Select>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>From</label>
              <div className={styles.selectfield}>
                <Select options=""></Select>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Subject</label>
              <div className={styles.textfield}>
                <ReactInput type="text" placeholder="New Subject"></ReactInput>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Email Body</label>
              <div className={styles.textfield}>
                <ReactInput type="text" placeholder="Message"></ReactInput>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Schedule Send</label>
              <div className={styles.selectfield}>
                <Select options="" placeholder="Schedule Options..."></Select>
              </div>
            </div>
            <div className={styles.footer}>
              <button className={styles.darkbutton} onClick={() => setShow(false)}>Close</button>

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
