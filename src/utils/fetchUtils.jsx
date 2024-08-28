import {logout} from "./LoginUtils";

export const fetchWithAuth = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  const headers = options.headers || {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  options.headers = headers;

  const response = await fetch(url, options);

  if (response.status === 403) {
  }

  return response;
}