import axios from "axios";

export const createPayment = async (url: string, body: any, token: string) => {
  await axios.post(url + "/UnidentifiedPayment", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
