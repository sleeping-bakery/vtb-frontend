import axios from "axios";

export const getBankOffer = async (
  url: string,
  token: string,
  handler: any,
  loanSize: string,
  currency: string
) => {
  const data = await axios.get(
    url +
      "/InstallmentPlan/BankOffer?loanSize=" +
      loanSize +
      "&currency=" +
      currency,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  handler(data);
};

export const createInstallmentPlan = async (
  url: string,
  token: string,
  bankOfferId: string,
  transactionId: string
) => {
  await axios.post(
    url +
      "/InstallmentPlan?bankOfferId=" +
      bankOfferId +
      "&transactionId=" +
      transactionId,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getInstallmentPlan = async (
  url: string,
  token: string,
  handler: any
) => {
  const data = await axios.get(url + "/InstallmentPlan", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const createInstallmentPlanPayment = async (
  url: string,
  token: string,
  id: string
) => {
  await axios.post(
    url + "/InstallmentPlan/Payment?installmentPlanId=" + id,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
