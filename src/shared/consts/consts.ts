import { UserSettingsConsents, UserSettingsConsentsNames } from "./enums";

export const COLORS = {
  BACKGROUND: "#f3f7fa",
  MAIN: "#FFFFFF",
  TEXT_MAIN: "#000000",
  PRIMARY_BLUE: "#1677ff",
};

export const USER_SETTINGS_CONSENTS = [
  {
    id: UserSettingsConsents.readAccountsBasic,
    name: UserSettingsConsentsNames.readAccountsBasic,
    idToRequest: 1,
  },
  {
    id: UserSettingsConsents.readAccountsDetail,
    name: UserSettingsConsentsNames.readAccountsDetail,
    idToRequest: 2,
  },
  {
    id: UserSettingsConsents.readBalances,
    name: UserSettingsConsentsNames.readBalances,
    idToRequest: 3,
  },
  {
    id: UserSettingsConsents.readTransactionsBasic,
    name: UserSettingsConsentsNames.readTransactionsBasic,
    idToRequest: 4,
  },
  {
    id: UserSettingsConsents.readTransactionsCredits,
    name: UserSettingsConsentsNames.readTransactionsCredits,
    idToRequest: 5,
  },
  {
    id: UserSettingsConsents.readTransactionsDebits,
    name: UserSettingsConsentsNames.readTransactionsDebits,
    idToRequest: 6,
  },
  {
    id: UserSettingsConsents.readTransactionsDetail,
    name: UserSettingsConsentsNames.readTransactionsDetail,
    idToRequest: 7,
  },
];
