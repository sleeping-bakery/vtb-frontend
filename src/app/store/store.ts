import { configureStore } from "@reduxjs/toolkit";
import consentsReducer from "./consent/consentSlice";
import { loadState, saveState } from "./localStorage";
import { IConsentSlice } from "../../shared/consts/types";

const persistedState: { consent: IConsentSlice } | undefined = loadState();

export const store = configureStore({
  reducer: {
    consent: consentsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    consent: store.getState().consent,
  });
});
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
