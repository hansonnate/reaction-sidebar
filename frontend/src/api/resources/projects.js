import { apiClient } from "../Api";

const uri = "/projects"

const getProjects = () => apiClient.get(`${uri}`);
const getProject = id => apiClient.get(`${uri}/${id}`);
const postProject = (body) => {
  console.log("calling post");
  console.log(body);
  apiClient.post(`${uri}`, body);
};

export default {
  getProjects,
  getProject,
  postProject
};
