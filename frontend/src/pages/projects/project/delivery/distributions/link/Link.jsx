// External
import React from "react";
import { useParams } from "react-router-dom";
// import { useFetchProject } from "api/resources/projects/projects";
import styles from "./Link.module.scss";
// Internal
import { useFetchProjectsGql, useFetchProjectGql } from "api/resources/projects/projects";
import Button from "components/Button/Button";
import ReactInput from "components/ReactInput/ReactInput";

export const Link = () => {
  const { id } = useParams();
  const projectQuery = useFetchProjectGql(id);
  console.log(projectQuery.data);

  const fetchProjectsQuery = useFetchProjectsGql();
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
          <Button>Generate Link</Button>
          <ReactInput type="text" placeholder="Link..."></ReactInput>
        </div>
      </div>
      <br/>
      <h2>User Link</h2>
    </div>
  );
};
