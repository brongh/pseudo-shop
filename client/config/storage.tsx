import { instance } from "../services/api";

export const setAuthToken = (token: string): void => {
  instance.defaults.headers.common["access-token"] = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      instance.defaults.headers.common["access-token"] = token;
    }
    return token;
  }
  return null;
};

export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    delete instance.defaults.headers.common["access-token"];
    localStorage.removeItem("token");
    console.log("remove", localStorage.removeItem("token"));
  }
};
