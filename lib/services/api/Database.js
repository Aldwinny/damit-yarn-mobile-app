// Information about the Express Server
import { API_URL_DEV as API_URL, API_KEY_DEV as API_KEY } from "@env";
import axios from "axios";

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
