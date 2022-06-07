/*
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useAutosave } from "react-autosave";

import { useApi, ProjectsApi } from "api";

export const ProjectContext = createContext();


export const ProjectContextProvider = ({ children }) => {
  const { id } = useParams();

  // API methods
  const getProjectApi = useApi(ProjectsApi.getProject);
  const patchProjectApi = useApi(ProjectsApi.patchProject);
  // const getQuestionsApi = useApi(QuestionsApi.getQuestions);
  // const getDistributionsApi = useApi(DistributionsApi.getDistributions);

  const [project, setProject] = useState();
  // const [questions, setQuestions] = useState();
  // const [distributions, setDistributions] = useState();

  useAutosave({data: project, onSave: patchProjectApi.request});

  useEffect(() => {
    console.log("getting project" + id);
    getProjectApi.request(id);
  }, []);

  useEffect(() => {
    if (getProjectApi.data) {
      setProject(getProjectApi.data);
    }
  }, [getProjectApi.data]);

  const getSurveyDetails = () => {
    return _.pick(project, [
      "id",
      "name",
      "description",
      "tags",
      "default_language",
      "supported_languages",
      "access_groups",
    ]);
  };

  const setSurveyDetails = (surveyDetails) => {
    setProject({ ...project, ...surveyDetails });
    Save.saveUpdatesLocal(
      { resource: "ProjectsApi", method: "patchProject" },
      surveyDetails
    );
  };

  const getQuestions = () => {
    if (project) {
      return project.questions;
    }
  };

  const setQuestions = (questions) => {
    setProject({ ...project, questions });
  };

  const save = () => {
    console.log("saving project");
  };

  return (
    <>
      {getProjectApi.loading && <p>Loading...</p>}
      {getProjectApi.error && <p>{getProjectApi.error}</p>}
      {getProjectApi.data && (
        <ProjectContext.Provider
          value={{
            project,
            setProject,
            getSurveyDetails,
            setSurveyDetails,
            getQuestions,
            setQuestions,
            save,
          }}
        >
          {children}
        </ProjectContext.Provider>
      )}
    </>
  );
};
*/

/**
 * Updates to make to this component:
 * - Allow updates to specific project attributes
 * - Only update certain attributes, like questions, when they were changed. Use reducers
 * Ideas:
 * - only load the data from a specific tab
 * - once loaded, store the data in a local state
 * - Store a local state of changes and only save on page change, after time interval, or on save button
 */
