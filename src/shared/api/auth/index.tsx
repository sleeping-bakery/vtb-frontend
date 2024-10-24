import { IUserResponse } from "../../consts/types";
import { baseGet, basePut } from "../base";

export const getUser = async (
  baseUrl: string,
  token: string,
  successHandler: (user: IUserResponse) => void
) => {
  const user = await baseGet(baseUrl + "/User", token);

  successHandler(user);
};

export const putUser = async (baseUrl: string, token: string, data: IUserResponse) => {
  await basePut(baseUrl + "/User", token, data);
};

export const changeUser = () => {};
