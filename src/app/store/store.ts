import { configureStore } from "@reduxjs/toolkit";
import { consentsSlice } from "./consent/consentSlice";

export const store = configureStore({
  reducer: {
    [consentsSlice.name]: consentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
