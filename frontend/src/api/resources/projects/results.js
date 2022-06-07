import { apiClient } from "api/Api";

const uri = "/results";

// TODO: Use react-query instead of this

const getResults = () => apiClient.get(`${uri}`);
const getResult = (resultId) => apiClient.get(`${uri}/${resultId}`);
const postResult = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getResults,
  getResult,
  postResult,
};
