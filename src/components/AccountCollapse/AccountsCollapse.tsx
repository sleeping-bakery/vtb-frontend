import { Collapse } from "antd";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { AccountsCollapseProps } from "../../shared/consts/types";
import { ACCOUNTS_ICONS, CURRENCY_ICONS } from "../../shared/consts/icons";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { ACCOUNTS_TYPES } from "../../shared/consts/consts";
import { ExtraButton, LabelField } from "./AccountsCollapse.styled";
import { AccountCard } from "../AccountsCard/AccountsCard";
import LaunchIcon from "@mui/icons-material/Launch";
import { AccountsModal } from "../AccountsModal/AccountsModal";
import { useState } from "react";

export const AccountsCollapse: React.FC<AccountsCollapseProps> = (props) => {
  const { collapseData: data, cards } = props;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handlerButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation();
    setSelectedIndex(index);
    handleModalOpen();
  };

  return (
    <>
      <Collapse
        size="large"
        expandIconPosition="end"
        items={data.map((accountData, index) => {
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
                  <p>{`${
                    ACCOUNTS_TYPES[accountData.account.accountSubType]
                  } • ${accountData.account.accountDescription}`}</p>
                </div>
              </LabelField>
            ),
            children: (
              <AccountCard
                cards={cards.filter(
                  (card) => card.accountId === accountData.account.accountId
                )}
                id={accountData.account.accountId}
              />
            ),
            extra: (
              <>
                <ExtraButton
                  onClick={(
                    event: React.MouseEvent<HTMLElement, MouseEvent>
                  ) => {
                    handlerButtonClick(event, index);
                  }}
                  icon={<LaunchIcon />}
                  shape="circle"
                />
                <CreditCardIcon />
              </>
            ),
          };
        })}
      />

      {selectedIndex !== null && (
        <AccountsModal
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          accountsData={data[selectedIndex]}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};
