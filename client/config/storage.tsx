import { instance } from "../services/api";

export const setAuthToken = (token: string): void => {
  instance.defaults.headers.common["access-token"] = token;
  localStorage.setItem("token", token);
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (token) {
    instance.defaults.headers.common["access-token"] = token;
  }
  return token;
};

export const removeAuthToken = (): void => {
  delete instance.defaults.headers.common["access-token"];
  console.log("remove", localStorage.remove("token"));
};
