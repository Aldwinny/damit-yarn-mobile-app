// Information about the Express Server
import { /* API_URL_DEV as API_URL,*/ API_KEY_DEV as API_KEY } from "@env";
import axios from "axios";

const API_URL = "http://192.168.100.111:3000";
/**
 * Convenience function for testing purposes for the Express Server
 */
export async function testDB() {
  let response;

  await fetch(`${API_URL}/debug`)
    .then(async (res) => {
      await res.json().then((message) => {
        response = message;
      });
    })
    .catch((err) => {
      console.err();
    });
}

export async function uploadFile(formData) {
  console.log(formData);
  console.log(`${API_URL}/debug`);
  return await axios.post(`${API_URL}/debug`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function awaitableTest() {
  let response;

  await axios
    .post(`${API_URL}/debug`, { firstName: "fred" })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
}
