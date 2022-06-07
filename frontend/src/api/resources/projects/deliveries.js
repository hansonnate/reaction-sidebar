import { apiClient } from "../../Api";

const uri = "/deliveries";

// TODO: Use react-query instead of this

const getDeliveries = () => apiClient.get(`${uri}`);
const getDelivery = (deliveryId) => apiClient.get(`${uri}/${deliveryId}`);
const postDelivery = (body) => {
  apiClient.post(`${uri}`, body);
};

export default {
  getDeliveries,
  getDelivery,
  postDelivery,
};
