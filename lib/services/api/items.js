import { API_URL, API_KEY, ITEM_REQ } from "@env";
import axios from "axios";

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

export const getCartItems = async (data) => {
  return axios.get(`${API_URL}${ITEM_REQ}/cart`, {
    params: {
      user: data.user,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
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

export const updateCart = async (data) => {
  return axios.put(`${API_URL}${ITEM_REQ}/cart`, {
    items: data.items,
    user: data.user,
    headers: {
      authorization: `Bearer ${data.token}`,
    },
  });
};

export const deleteItemFromCart = async (data) => {
  console.log(data);
  return axios.delete(`${API_URL}${ITEM_REQ}/cart`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      item: data.item,
      user: data.user,
    },
  });
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
  });
};

export const recordTransaction = async (data) => {
  return await axios.post(`${API_URL}${ITEM_REQ}/transaction`, {
    id: data.id,
    items: data.items,
    quantities: data.quantities,
    total: data.total,
    method: data.method,
    headers: {
      authorization: `Bearer ${data.token}`,
    },
  });
};

export const getTransactions = async (data) => {
  return await axios.get(`${API_URL}${ITEM_REQ}/transaction`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      id: data.id,
    },
  });
};

export const getLikes = async (data) => {
  return await axios.get(`${API_URL}${ITEM_REQ}/likes`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      likes: data.likes,
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
