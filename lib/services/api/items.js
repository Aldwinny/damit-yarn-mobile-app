import {
  /* API_URL_DEV as API_URL,*/ API_KEY_DEV as API_KEY,
  ITEM_REQ,
} from "@env";
import axios from "axios";

const API_URL = "http://192.168.100.111:3000";

export const getItemsFromShop = async (data) => {
  return axios.get(`${API_URL}${ITEM_REQ}`, {
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

export const getItemReviews = async (data) => {
  return axios.get(`${API_URL}${ITEM_REQ}/reviews/${data.id}`);
};

export const addItemToCart = async (data) => {
  return axios.post(
    `${API_URL}${ITEM_REQ}/cart`,
    {
      data: {
        item: data.item,
        user: data.user,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};
