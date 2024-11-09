import SavingsIcon from "@mui/icons-material/Savings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const CURRENCY_ICONS: Record<string, string> = {
  RUB: "₽",
  DOL: "$",
  EUR: "€",
};

export const ACCOUNTS_ICONS: Record<number, JSX.Element> = {
  1: <LocalAtmIcon />,
  2: <AccountBalanceIcon />,
  3: <AccountBalanceIcon />,
  4: <AccountBalanceIcon />,
  5: <AccountBalanceIcon />,
  6: <SavingsIcon />,
};
