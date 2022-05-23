import { apiClient } from "../Api";

const uri = "/questions";

const getQuestion = (questionId) => apiClient.get(`${uri}/${questionId}`);
const getQuestions = (projectId) => apiClient.get(`/projects/${projectId}?_embed=questions`);
const postQuestion = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getQuestion,
  getQuestions,
  postQuestion,
};
