const PROTOCOL = "http";
const HOSTNAME = "localhost";
const PORT = "3001";

export const getApiRoute = (path: string) =>
  `${PROTOCOL}://${HOSTNAME}:${PORT}${path}`;

const defaultInit = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const fetchApi = (path: string, init?: RequestInit) => {
  const url = getApiRoute(path);
  return fetch(url, { ...defaultInit, ...init }).then((response) => {
    try {
      if (!response.ok) throw response;

      return response.json();
    } catch (error) {
      throw error;
    }
  });
};
