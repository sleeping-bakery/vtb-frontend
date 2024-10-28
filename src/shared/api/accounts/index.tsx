import { baseGet } from "../base";

export const getAccounts = async (
  baseUrl: string,
  token: string,
  successHandler: (accounts: any) => void
) => {
  const accounts = await baseGet(baseUrl + "/Account", token);
  const balances = await baseGet(baseUrl + "/Balance", token);

  successHandler({ accounts, balances });
};

export const getCards = async (
  baseUrl: string,
  token: string,
  successHandler: (cards: any) => void
) => {
  const cards = await baseGet(baseUrl + "/Card", token);

  successHandler(cards);
};

export const getStatement = async (
  baseUrl: string,
  token: string,
  accountId: string,
  successHandler: (statement: any) => void
) => {
  const statement = await baseGet(baseUrl + "/Statement/" + accountId, token);

  successHandler(statement);
};

export const getTransaction = async (
  baseUrl: string,
  token: string,
  accountId: string,
  successHandler: (transaction: any) => void
) => {
  const transaction = await baseGet(
    baseUrl + "/Transaction/" + accountId,
    token
  );

  successHandler(transaction);
};
