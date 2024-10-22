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
      enableAllConsent: (state) => {
        state.readAccountsBasic = true;
        state.readAccountsDetail = true;
        state.readBalances = true;
        state.readTransactionsBasic = true;
        state.readTransactionsCredits = true;
        state.readTransactionsDebits = true;
        state.readTransactionsDetail = true;
      },
      enableConsent: (
        state,
        action: PayloadAction<{ key: keyof IConsentSlice; value: boolean }>
      ) => {
        state[action.payload.key] = action.payload.value;
      },
    },
  });

  export const { enableAllConsent } = consentsSlice.actions;

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

  export default consentsSlice.reducer;
