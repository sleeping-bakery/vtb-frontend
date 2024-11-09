import { basePost } from "../base";
import axios from "axios";

export const createCard = async (url: string, token: string, body: any) => {
  await basePost(url + "/Card?AccountId=" + body.accountId, token);
};

export const getCardDetail = async (url: string, id: string, token: string) => {
  return (
    await axios.get(url + "/Card/Detail?cardId=" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
};

export const getCardCVV = async (url: string, id: string, token: string) => {
  return (
    await axios.get(url + "/Card/CVV?cardId=" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
};

export const deleteCard = async (url: string, id: string, token: string) => {
  return (
    await axios.delete(url + "/Card?cardId=" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
};

export const updateCard = async (url: string, body: any, token: string) => {
  return (
    await axios.patch(url + "/Card", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
};
