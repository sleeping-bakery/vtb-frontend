import axios from "axios";

export const baseGet = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    
    return response.data;
  } catch (e) {}
};

export const basePost = (url: string, body: any, successFunction: any) => {
  const response = axios.post(url, body);

  successFunction(response);
};

export const basePut = async (url: string, token: string, body: any) => {
  try {
    await axios.put(url, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (e) {}
};
