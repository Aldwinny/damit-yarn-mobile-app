import { API_URL_DEV as API_URL, API_KEY_DEV as API_KEY, USER_REQ } from "@env";
import axios from "axios";

export const registerUser = async (data) => {
  let response;

  await axios
    .post(`${API_URL}${USER_REQ}`, data)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}${USER_REQ}/login`, data);
};

export const checkMatchPassword = async (data) => {
  return await axios.post(
    `${API_URL}${USER_REQ}/verify`,
    {
      data: {
        id: data.id,
        password: data.password,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};

/**
 * this function sends an API request that deletes the user. The data parameter must contain the id and token for use in authorization.
 * @param {*} data
 */
export const deleteUser = async (data) => {
  return await axios.delete(`${API_URL}${USER_REQ}/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      id: data.id,
    },
  });
};

export const updateUser = async (data) => {
  return await axios.put(
    `${API_URL}${USER_REQ}/${data.id}`,
    {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      code: data.code,
      contact: data.contact,
      zip: data.zip,
      street: data.street,
      city: data.city,
      country: data.country,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};