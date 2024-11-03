import axios from "axios";

export const getServices = async (url: string, token: string, handler: any) => {
  const data = await axios.get(url + "/Service", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const createPayment = async (url: string, body: any, token: string) => {
  await axios.post(url + "/UniversalPayment", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
