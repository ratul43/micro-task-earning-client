const BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000";

export const apiFetch = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};