export const fetchWithAuth = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  const headers = options.headers || {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  options.headers = headers;

  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
  }

  return response;
}