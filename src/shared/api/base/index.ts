import axios from "axios";

export const baseGet = (url: string, successFunction: any) => {
  const response = axios.get(url);

  successFunction(response);
};

export const basePost = (url: string, body: any, successFunction: any) => {
  const response = axios.post(url, body);

  successFunction(response);
};
