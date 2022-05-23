import { apiClient } from "../Api";

const uri = "/projects"

const getProjects = () => apiClient.get(`${uri}`);
const getProject = projectId => apiClient.get(`${uri}/${projectId}`);
const postProject = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getProjects,
  getProject,
  postProject
};
