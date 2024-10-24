export interface IConsentSlice {
  readAccountsBasic: boolean;
  readAccountsDetail: boolean;
  readBalances: boolean;
  readTransactionsBasic: boolean;
  readTransactionsCredits: boolean;
  readTransactionsDebits: boolean;
  readTransactionsDetail: boolean;
}

export interface ISettings {
  isOpen: boolean;
  confirm: () => void;
  cancel: () => void;
}

export interface IUser {
  id: string;
  login: string;
  token: string | undefined;
}

export interface IUserResponse {
  id: string;
  accountConsents: number[];
  login: string;
}
