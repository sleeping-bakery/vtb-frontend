import axios from "axios";

export const getBonuses = async (
  url: string,
  token: string,
  handler: any,
  id: string
) => {
  const data = await axios.get(url + "/BonusPoint?accountId=" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const createBonuses = async (url: string, body: any, token: string) => {
  await axios.post(url + "/BonusPoint", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
