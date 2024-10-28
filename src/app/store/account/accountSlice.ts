import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  IAccountSlice,
  MappedAccounts,
  Statement,
  Transaction,
} from "../../../shared/consts/types";

const initialState: IAccountSlice = {
  accountsData: [],
  transaction: [],
  statement: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountsData: (state, action: PayloadAction<MappedAccounts[]>) => {
      state.accountsData = action.payload;
    },
    setTransaction: (state, action: PayloadAction<Transaction[]>) => {
      state.transaction = action.payload;
    },
    setStatement: (state, action: PayloadAction<Statement[]>) => {
      state.statement = action.payload;
    },
  },
});

export const { setAccountsData, setTransaction, setStatement } =
  accountSlice.actions;

export const selectAccountsData = (state: RootState) =>
  state.account.accountsData;

export const selectTransaction = (state: RootState) =>
  state.account.transaction;

export const selectStatement = (state: RootState) => state.account.statement;

export default accountSlice.reducer;
