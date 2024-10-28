import { configureStore } from "@reduxjs/toolkit";
import consentsReducer from "./consent/consentSlice";
import userReducer from "./user/userSlice";
import accountReducer from "./account/accountSlice";

export const store = configureStore({
  reducer: {
    consent: consentsReducer,
    user: userReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Если понадобится сохранение настроек после перезагрузки
// import { loadState, saveState } from "./localStorage";
// import { IConsentSlice } from "../../shared/consts/types";

// const persistedState: { consent: IConsentSlice } | undefined = loadState();
// preloadedState: persistedState,

// store.subscribe(() => {
// saveState({
// consent: store.getState().consent,
// user: store.getState().user,
// });
// });
