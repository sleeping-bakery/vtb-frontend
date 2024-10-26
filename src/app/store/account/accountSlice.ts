import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAccountSlice, MappedAccounts } from "../../../shared/consts/types";

const initialState: IAccountSlice = {
  accountsData: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountsData: (state, action: PayloadAction<MappedAccounts[]>) => {
      state.accountsData = action.payload;
    },
  },
});

export const { setAccountsData } = accountSlice.actions;

export const selectAccountsData = (state: RootState) =>
  state.account.accountsData;

export default accountSlice.reducer;
