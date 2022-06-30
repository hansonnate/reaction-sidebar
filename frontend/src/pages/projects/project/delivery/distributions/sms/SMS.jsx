// External
import React, { useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/BasicTable/ReactTable.jsx";
import styles from "./SMS.module.scss";
import { useParams } from "react-router-dom";
import { useFetchProject } from "api/resources/projects/projects";
import Select from "react-select";
import DistributionModal from "components/ReactModal/DistributionModal.jsx";
import { TextArea } from "components/inputs/input_fields/TextArea/TextArea";


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

export const SMS = () => {
  const { id } = useParams();
  const projectQuery = useFetchProject(id);
  console.log(projectQuery.data);
  const columns = React.useMemo(
    () => [
      {
        Header: "Audience",
        accessor: "audience",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Message",
        accessor: "message",
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
  // const [projectName, setProjectName] = useState("New Project");
  // const [description, setDescription] = useState("");

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
          data={projectQuery.data.sms}
          buttonMethod={() => setShow(true)}
          modalTitle="Compose Text"
        />
      )}
      <DistributionModal show={show} onClose={() => setShow(false)}>
        <div className={styles.content}>
          <h1>Compose Text</h1>
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
              <label>Text Body</label>
              <div className={styles.textfield}>
                {/* <textarea placeholder="Type Message here..."></textarea> */}
                <TextArea placeholder="Type Message here..."></TextArea>
              </div>
            </div>
            <div className={styles.formfield}>
              <label>Schedule Send</label>
              <div className={styles.selectfield}>
                <Select options="" placeholder="Schedule Options..."></Select>
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
