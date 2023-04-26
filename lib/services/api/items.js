import {
  /* API_URL_DEV as API_URL,*/ API_KEY_DEV as API_KEY,
  ITEM_REQ,
} from "@env";
import axios from "axios";

const API_URL = "http://192.168.183.210:3000";

export const getItemsFromShop = async (data) => {
  console.log(ITEM_REQ);
  return axios.get(`${API_URL}${ITEM_REQ}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      id: data.shopid,
    },
  });
};

export const getAllItems = async () => {
  return axios.get(`${API_URL}${ITEM_REQ}`);
};

export const getItemByID = async (data) => {
  return axios.get(`${API_URL}${ITEM_REQ}/${data.id}`);
};
