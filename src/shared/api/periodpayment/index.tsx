import axios from "axios";

export const getPeriodPayment = async (
  url: string,
  token: string,
  successFunction: any
) => {
  successFunction(
    (
      await axios.get(url + "/PeriodPaymentConsent", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    ).data
  );
};

export const createPeriodPayment = async (
  url: string,
  token: string,
  body: any
) => {
  await axios.post(url + "/PeriodPaymentConsent", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deletePeriodPayment = async (
  url: string,
  token: string,
  id: string
) => {
  await axios.delete(
    url + "/PeriodPaymentConsent?periodPaymentConsentId=" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const periodPayment = async (url: string, token: string, body: any) => {
  await axios.post(url + "/PeriodPayment", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
