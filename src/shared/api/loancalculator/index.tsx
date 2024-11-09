import axios from "axios";

export const getBanks = async (url: string, token: string, handler: any) => {
  const data = await axios.get(url + "/LoanCalculator/BankInterestRate", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};

export const postCalculator = async (
  url: string,
  body: any,
  token: string,
  handler: any
) => {
  const data = await axios.post(url + "/LoanCalculator", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  handler(data);
};
