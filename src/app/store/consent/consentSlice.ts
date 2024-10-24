import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IConsentSlice } from "../../../shared/consts/types";

const initialState: IConsentSlice = {
  readAccountsBasic: false,
  readAccountsDetail: false,
  readBalances: false,
  readTransactionsBasic: false,
  readTransactionsCredits: false,
  readTransactionsDebits: false,
  readTransactionsDetail: false,
};

export const consentsSlice = createSlice({
  name: "consent",
  initialState,
  reducers: {
    changeAllConsents: (state, action: PayloadAction<boolean>) => {
      state.readAccountsBasic = action.payload;
      state.readAccountsDetail = action.payload;
      state.readBalances = action.payload;
      state.readTransactionsBasic = action.payload;
      state.readTransactionsCredits = action.payload;
      state.readTransactionsDebits = action.payload;
      state.readTransactionsDetail = action.payload;
    },
    changeConsent: (
      state,
      action: PayloadAction<{ key: keyof IConsentSlice; value: boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { changeAllConsents, changeConsent } = consentsSlice.actions;

export const selectConsents = (state: RootState) => {
  return {
    readAccountsBasic: state.consent.readAccountsBasic,
    readAccountsDetail: state.consent.readAccountsDetail,
    readBalances: state.consent.readBalances,
    readTransactionsBasic: state.consent.readTransactionsBasic,
    readTransactionsCredits: state.consent.readTransactionsCredits,
    readTransactionsDebits: state.consent.readTransactionsDebits,
    readTransactionsDetail: state.consent.readTransactionsDetail,
  };
};

export const selectConsentsIds = (state: RootState) => {
  const consents = {
    readAccountsBasic: state.consent.readAccountsBasic,
    readAccountsDetail: state.consent.readAccountsDetail,
    readBalances: state.consent.readBalances,
    readTransactionsBasic: state.consent.readTransactionsBasic,
    readTransactionsCredits: state.consent.readTransactionsCredits,
    readTransactionsDebits: state.consent.readTransactionsDebits,
    readTransactionsDetail: state.consent.readTransactionsDetail,
  };

  return Object.values(consents).reduce(
    (a: number[], v: boolean, i) => (v ? [...a, i + 1] : a),
    []
  );
};

export default consentsSlice.reducer;
