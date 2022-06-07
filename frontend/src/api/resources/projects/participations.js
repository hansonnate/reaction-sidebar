import { apiClient } from "../../Api";

const uri = "/participations";

// TODO: Use react-query instead of this

const getParticipations = () => apiClient.get(`${uri}`);
const getParticipation = (participationId) =>
  apiClient.get(`${uri}/${participationId}`);
const postParticipation = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getParticipations,
  getParticipation,
  postParticipation,
};
