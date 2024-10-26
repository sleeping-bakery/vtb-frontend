import { Collapse } from "antd";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { AccountsCollapseProps } from "../../shared/consts/types";
import { ACCOUNTS_ICONS, CURRENCY_ICONS } from "../../shared/consts/icons";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { ACCOUNTS_TYPES } from "../../shared/consts/consts";
import { ExtraButton, LabelField } from "./AccountsCollapse.styled";
import { AccountCard } from "../AccountsCard/AccountsCard";
import LaunchIcon from "@mui/icons-material/Launch";

export const AccountsCollapse: React.FC<AccountsCollapseProps> = (props) => {
  const { collapseData: data, handleModalOpen } = props;

  const handlerButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleModalOpen();
  };

  return (
    <Collapse
      size="large"
      expandIconPosition="end"
      items={data.map((accountData) => {
        const icon = CURRENCY_ICONS[String(accountData.account.currency)];

        return {
          key: accountData.account.accountId,
          label: (
            <LabelField>
              {ACCOUNTS_ICONS[accountData.account.accountSubType]}

              <div>
                <span>
                  {`${formatCurrency(
                    Number(accountData.balance[0].amount.amount)
                  )} ${icon}`}
                </span>
                <p>{`${ACCOUNTS_TYPES[accountData.account.accountSubType]} • ${
                  accountData.account.accountDescription
                }`}</p>
              </div>
            </LabelField>
          ),
          children: <AccountCard />,
          extra: (
            <>
              <ExtraButton
                onClick={handlerButtonClick}
                icon={<LaunchIcon />}
                shape="circle"
              />
              <CreditCardIcon />
            </>
          ),
        };
      })}
    />
  );
};
