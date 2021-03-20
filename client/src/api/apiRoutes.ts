const HOSTNAME = "localhost";
const PROTOCOL = "http";
const PORT = "3001";

export const getApiRoute = (path: string) =>
  `${PROTOCOL}://${HOSTNAME}:${PORT}${path}`;

export const fetchApi = (path: string, init?: RequestInit) => {
  const url = getApiRoute(path);
  return fetch(url, init);
};
