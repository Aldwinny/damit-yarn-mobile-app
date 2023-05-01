import {
  /* API_URL_DEV as API_URL,*/ API_KEY_DEV as API_KEY,
  ITEM_REQ,
} from "@env";
import axios from "axios";

const API_URL = "http://192.168.254.129:3000";

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

export const deleteItemFromCart = async (data) => {
  return axios.delete(
    `${API_URL}${ITEM_REQ}/cart`,
    {
      params: {
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

export const createItem = async (data, user) => {
  return await axios.post(`${API_URL}${ITEM_REQ}`, {
    ...data,
    shop: user.shopid,
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });
};

export const updateItem = async (data, user) => {
  return await axios.put(`${API_URL}${ITEM_REQ}/${data.id}`, {
    ...data,
    shop: user.shopid,
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });
};

export const deleteItem = async (data) => {
  return await axios.delete(`${API_URL}${ITEM_REQ}/${data.id}`, {
    headers: {
      authorization: `Bearer ${data.token}`,
    },
  });
};

export const uploadItemImage = async (image, data) => {
  return await axios.post(`${API_URL}${ITEM_REQ}/upload`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      id: data.id,
      old: data.old,
      update: data.update,
    },
  });
};

// Provide token, image
export const deleteItemImage = async (data) => {
  return await axios.delete(`${API_URL}${ITEM_REQ}/upload`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      id: data.id,
      old: data.old,
      update: data.update,
    },
  });
};
