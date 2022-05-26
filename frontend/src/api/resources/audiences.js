import { apiClient } from "../Api";

const uri = "/audiences"

const getAudiences = () => apiClient.get(`${uri}`);
const getAudience = id => apiClient.get(`${uri}/${id}`);
const postAudience = (body) => {
  console.log("calling post");
  console.log(body);
  apiClient.post(`${uri}`, body);
};

export default {
  getAudiences,
  getAudience,
  postAudience
};
