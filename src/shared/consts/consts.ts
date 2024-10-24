import { UserSettingsConsents, UserSettingsConsentsNames } from "./enums";

export const COLORS = {
  BACKGROUND: "#f3f7fa",
  MAIN: "#FFFFFF",
  TEXT_MAIN: "#000000",
  PRIMARY_BLUE: "#1677ff",
};

export const USER_SETTINGS_CONSENTS = [
  {
    id: UserSettingsConsents.ReadAccountsBasic,
    name: UserSettingsConsentsNames.ReadAccountsBasic,
    idToRequest: 1,
  },
  {
    id: UserSettingsConsents.ReadAccountsDetail,
    name: UserSettingsConsentsNames.ReadAccountsDetail,
    idToRequest: 2,
  },
  {
    id: UserSettingsConsents.ReadBalances,
    name: UserSettingsConsentsNames.ReadBalances,
    idToRequest: 3,
  },
  {
    id: UserSettingsConsents.ReadTransactionsBasic,
    name: UserSettingsConsentsNames.ReadTransactionsBasic,
    idToRequest: 4,
  },
  {
    id: UserSettingsConsents.ReadTransactionsCredits,
    name: UserSettingsConsentsNames.ReadTransactionsCredits,
    idToRequest: 5,
  },
  {
    id: UserSettingsConsents.ReadTransactionsDebits,
    name: UserSettingsConsentsNames.ReadTransactionsDebits,
    idToRequest: 6,
  },
  {
    id: UserSettingsConsents.ReadTransactionsDetail,
    name: UserSettingsConsentsNames.ReadTransactionsDetail,
    idToRequest: 7,
  },
];
