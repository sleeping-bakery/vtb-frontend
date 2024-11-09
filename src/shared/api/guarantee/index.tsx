import axios from "axios";

export const getGuarantee = async (
  url: string,
  token: string,
  handler: any
) => {
  const data = await axios.get(url + "/GuaranteeOrder", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const getGuaranteeDetails = async (
  url: string,
  token: string,
  handler: any,
  id: string
) => {
  const data = await axios.get(url + "/GuaranteeOrder/OrderId?orderId=" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const createGuarantee = async (
  url: string,
  body: any,
  token: string
) => {
  await axios.post(url + "/GuaranteeOrder", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteGuarantee = async (
  url: string,
  id: string,
  token: string
) => {
  return (
    await axios.delete(url + "/GuaranteeOrder?orderId=" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
};
