import {
  MappedAccounts,
  Statement as IStatement,
  Transaction as ITransaction,
} from "../../shared/consts/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { getTransaction, getStatement } from "../../shared/api/accounts";
import { CURRENCY_ICONS } from "../../shared/consts/icons";
import { ACCOUNTS_TYPES, COLORS } from "../../shared/consts/consts";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import {
  AccountsModalStyled,
  TextSwitchBlock,
  TextSwitchButton,
} from "./AccountsModal.styled";
import {
  selectStatement,
  selectTransaction,
  setStatement,
  setTransaction,
} from "../../app/store/account/accountSlice";
import { Transaction } from "../Transaction/Transaction";
import { Statement } from "../Statement/Statement";

interface AccountsModalProps {
  isOpen: boolean;
  accountsData: MappedAccounts;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

const enum EActiveMenu {
  transaction = "transaction",
  statement = "statement",
}

export const AccountsModal: React.FC<AccountsModalProps> = ({
  isOpen,
  accountsData: data,
  handleModalClose,
}) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const statement = useAppSelector(selectStatement);
  const transaction = useAppSelector(selectTransaction);

  const [activeMenu, setActiveMenu] = useState(EActiveMenu.transaction);

  useEffect(() => {
    const handleSaveStatements = (statements: {
      data: { statement: IStatement[] };
    }) => {
      dispatch(setStatement(statements.data.statement));
    };

    const handleSaveTransactions = (transactions: {
      data: { transaction: ITransaction[] };
    }) => {
      dispatch(setTransaction(transactions.data.transaction));
    };

    if (process.env.REACT_APP_BACKEND_URL && token) {
      getStatement(
        process.env.REACT_APP_BACKEND_URL,
        token,
        data.account.accountId,
        handleSaveStatements
      );
      getTransaction(
        process.env.REACT_APP_BACKEND_URL,
        token,
        data.account.accountId,
        handleSaveTransactions
      );
    }
  }, [token, dispatch, data]);

  const handleCancel = () => {
    setActiveMenu(EActiveMenu.transaction);

    handleModalClose();
  };

  return (
    <AccountsModalStyled
      title="Просмотр cчёта"
      open={isOpen}
      onCancel={handleCancel}
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <section>
        <p>
          {ACCOUNTS_TYPES[data.account.accountSubType]} •{" "}
          {data.account.accountDescription}
        </p>
        <h3>
          {formatCurrency(Number(data.balance[0].amount.amount))}{" "}
          {CURRENCY_ICONS[String(data.account.currency)]}
        </h3>
      </section>
      <section>
        <TextSwitchBlock>
          <TextSwitchButton
            onClick={() => {
              setActiveMenu(EActiveMenu.transaction);
            }}
          >
            <h2
              style={
                activeMenu === EActiveMenu.transaction
                  ? {
                      color: COLORS.PRIMARY_BLUE,
                    }
                  : {}
              }
            >
              История
            </h2>
          </TextSwitchButton>
          <TextSwitchButton
            onClick={() => {
              setActiveMenu(EActiveMenu.statement);
            }}
          >
            <h2
              style={
                activeMenu === EActiveMenu.statement
                  ? {
                      color: COLORS.PRIMARY_BLUE,
                    }
                  : {}
              }
            >
              Выписка
            </h2>
          </TextSwitchButton>
        </TextSwitchBlock>
        {activeMenu === EActiveMenu.transaction ? (
          <Transaction data={transaction} />
        ) : (
          <Statement data={statement} transactionData={transaction} />
        )}
      </section>
    </AccountsModalStyled>
  );
};
