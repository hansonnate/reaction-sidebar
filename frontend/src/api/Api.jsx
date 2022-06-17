import { GraphQLClient } from "graphql-request";
import { useQuery, useMutation } from "react-query";


// GRAPHQL - REACTION SERVER
const endpoint = "http://localhost:8001/graphql";

export const useGqlQuery = (key, query, variables, options = {}) => {
  const headers = {};
  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query, variables);
  return useQuery(key, fetchData, options);
};

export const useGqlMutation = (query, variables, options = {}) => {
  const headers = {};
  const graphQLClient = new GraphQLClient(endpoint, headers);

  const mutate = async () => await graphQLClient.request(query, variables);
  return useMutation(mutate, options);
};



// REST - JSON SERVER
import { useState } from "react";
import axios from "axios";

export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export const apiClient = axios.create({
  baseURL: "http://localhost:3001"
});