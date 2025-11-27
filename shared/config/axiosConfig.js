import axios from "axios";
import * as SecureStore from "expo-secure-store";
import NetInfo from "@react-native-community/netinfo";
import { triggerGlobalLogout } from "../auth/globalLogoutConfig";
import { errorBridge } from "../lib/utils";

export const isDevelopment =
  process.env.EXPO_PUBLIC_APP_ENV === "development";

export const baseURL = isDevelopment
  ? process.env.EXPO_PUBLIC_API_DEV
  : process.env.EXPO_PUBLIC_API_PROD;

export const axiosConfig = axios.create({
  baseURL,
  timeout: 15000,
});

const getAccessToken = () => SecureStore.getItemAsync("accessToken");
const getRefreshToken = () => SecureStore.getItemAsync("refreshToken");

const saveAccessToken = (t) =>
  SecureStore.setItemAsync("accessToken", t || "");
const saveRefreshToken = (t) =>
  SecureStore.setItemAsync("refreshToken", t || "");

let refreshPromise = null; // shared promise

const refreshTokens = async () => {
  if (!refreshPromise) {
    refreshPromise = axiosConfig
      .get("/auth/refreshtoken")
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data;

        if (accessToken) await saveAccessToken(accessToken);
        if (refreshToken) await saveRefreshToken(refreshToken);

        return accessToken;
      })
      .catch((err) => {
        triggerGlobalLogout();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

axiosConfig.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers["refresh-token"] = `Bearer ${refreshToken}`;
  }

  config.headers.platform = "mobile";

  return config;
});

axiosConfig.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    // -------- NETWORK CHECK --------
    const net = await NetInfo.fetch();
    if (!net.isConnected) {
      errorBridge.showError("network", "No internet connection");
      return Promise.reject(error);
    }

    // -------- HANDLE 401 (TOKEN EXPIRED) --------
    const status = error.response?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refreshtoken")
    ) {
      originalRequest._retry = true;

      try {
        // ensure only one refresh call happens
        const newAccessToken = await refreshTokens();

        // attach new token to retry request headers
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosConfig(originalRequest);
      } catch (err) {
        triggerGlobalLogout();
        return Promise.reject(err);
      }
    }

    // -------- SERVER / DATABASE ERRORS --------
    const code = error.response?.status;
    const data = error.response?.data;

    if (data?.error === "DATABASE_UNAVAILABLE") {
      errorBridge.showError("database", "Database unavailable");
    } else if (data?.error === "DATABASE_TIMEOUT") {
      errorBridge.showError("database", "Database timeout");
    } else if (data?.error === "DATABASE_CONNECTION_ERROR") {
      errorBridge.showError("database", "Database connection issue");
    } else if (code >= 500) {
      errorBridge.showError("server", "Server error. Try later.");
    }

    // -------- TIMEOUT --------
    if (error.code === "ECONNABORTED") {
      errorBridge.showError("timeout", "Request timed out");
    }

    return Promise.reject(error);
  }
);
