import { apiClient } from "../../Api";

const uri = "/distributions";

// TODO: Use react-query instead of this

const getDistributions = () => apiClient.get(`${uri}`);
const getDistribution = (distributionId) =>
  apiClient.get(`${uri}/${distributionId}`);
const postDistribution = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getDistributions,
  getDistribution,
  postDistribution,
};
