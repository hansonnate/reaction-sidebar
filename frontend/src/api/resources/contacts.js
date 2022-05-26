import { apiClient } from "../Api";

const uri = "/contacts"

const getContacts = () => apiClient.get(`${uri}`);
const getContact = id => apiClient.get(`${uri}/${id}`);
const postContact = (body) => {
  console.log("calling post");
  console.log(body);
  apiClient.post(`${uri}`, body);
};

export default {
  getContacts,
  getContact,
  postContact
};
