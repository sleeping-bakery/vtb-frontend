import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../../shared/consts/types";

const initialState: IUser = {
  id: "",
  login: "",
  token: undefined,
};

export const consentsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserId, setUserLogin, setUserToken } = consentsSlice.actions;

export const selectId = (state: RootState) => state.user.id;
export const selectLogin = (state: RootState) => state.user.login;
export const selectToken = (state: RootState) => state.user.token;

export default consentsSlice.reducer;
