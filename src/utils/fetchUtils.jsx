import {logout} from "./LoginUtils";
import categories from "../common/Categories";

export const fetchWithAuth = async (url, options = {}, serial) => {

  const token = sessionStorage.getItem("token");

  const headers = options.headers || {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  options.headers = headers;
  const response = await fetch(url, options);

  if (serial) {
    try {
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return response.json();
    }
  }

  if (response.status === 403) {
    try {
      throw new Error("Error fetching data from " + url + ": " + response.statusText);
    } catch (error) {
      console.error(error);
      return response.json();
    }
  }

  return response;
}