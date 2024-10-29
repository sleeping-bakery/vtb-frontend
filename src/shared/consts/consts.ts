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

export const ACCOUNTS_TYPES: Record<number, string> = {
  1: "Кредитный счёт",
  2: "Дебетовый счёт",
  3: "Счёт",
  4: "Ипотечный cчёт",
  5: "Счёт",
  6: "Сберегательный счёт",
};

export const CARD_STATUSES: Record<number, string> = {
  1: "Заблокирована",
  2: "Активна",
  3: "Перманентно заблокирована. Нельзя обновить",
};
