import apiClient from "../Api";

const getOrganizations = () => apiClient.get("/organizations");
const postOrganiation = () => apiClient.post("/organization");

export default {
  getOrganizations,
  postOrganiation,
};
