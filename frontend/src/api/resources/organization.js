import { apiClient } from "../Api";

const getOrganizations = () => apiClient.get("/organizations");
const postOrganization = (body) => {
  console.log("calling post");
  console.log(body);
  apiClient.post("/organizations", body);
};

export default {
  getOrganizations,
  postOrganization,
};
