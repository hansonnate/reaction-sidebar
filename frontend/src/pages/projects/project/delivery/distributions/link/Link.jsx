// External
import React from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "api/resources/projects/projects";
import styles from "./Link.module.scss";
// Internal
import { useFetchProjects } from "api/resources/projects/projects";
import ActionButton from "components/ActionButton/ActionButton";
import ReactInput from "components/ReactInput/ReactInput";

export const Link = () => {
  const { id } = useParams();
  const projectQuery = useFetchProject(id);
  console.log(projectQuery.data);

  const fetchProjectsQuery = useFetchProjects();
  console.log(fetchProjectsQuery.data);
  const onChangeValue = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles.linkpage}>
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>{fetchProjectsQuery.error}</p>}
      <h2> Sharable Link </h2>
      <div className={styles.shareablelink} onChange={onChangeValue}>
        <div className={styles.radiobutton}>
          <input type="radio" name="gender" />
          <label>Make responses anonymous</label>
          <i className="bi bi-question-circle"></i>
        </div>
        <div className={styles.radiobutton}>
          <input type="radio" name="gender" />
          <label>Require users to enter contact information</label>
          <i className="bi bi-question-circle"></i>
        </div>
        <div className={styles.generatelink}>
          <ActionButton title="Generate Link"></ActionButton>
          <ReactInput type="text" placeholder="Link..."></ReactInput>
        </div>
      </div>
      <br/>
      <h2>User Link</h2>
    </div>
  );
};
