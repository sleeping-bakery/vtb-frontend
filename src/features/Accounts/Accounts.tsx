import { useEffect, useState } from "react";
import { AccountsContent, AccountsPage, PageTitle } from "./Accounts.styled";
import { getAccounts, getCards } from "../../shared/api/accounts";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { Account, Balance, MappedAccounts } from "../../shared/consts/types";
import {
  selectAccountsData,
  setAccountsData,
} from "../../app/store/account/accountSlice";
import { AccountsCollapse } from "../../components/AccountCollapse/AccountsCollapse";

export const Accounts = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const accountsData = useAppSelector(selectAccountsData);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const handlerAccounts = (data: any) => {
      const mappedData: MappedAccounts[] = [];

      data.accounts.data.account.forEach((accountItem: Account) => {
        const balanceItem: Balance[] = data.balances.data.balance.filter(
          (balanceItem: Balance) =>
            balanceItem.accountId === accountItem.accountId
        );

        mappedData.push({
          balance: balanceItem,
          account: accountItem,
        });
      });

      dispatch(setAccountsData(mappedData));
    };

    const handlerCards = (data: any) => {
      setCards(data);
    };

    if (process.env.REACT_APP_BACKEND_URL && token) {
      getAccounts(process.env.REACT_APP_BACKEND_URL, token, handlerAccounts);
      getCards(process.env.REACT_APP_BACKEND_URL, token, handlerCards);
    }
  }, [token, dispatch]);

  return (
    <AccountsPage>
      <AccountsContent>
        <PageTitle>Счета пользователя</PageTitle>
        <AccountsCollapse cards={cards} collapseData={accountsData} />
      </AccountsContent>
    </AccountsPage>
  );
};
