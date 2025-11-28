import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { triggerGlobalLogout } from "../../features/auth/config/globalLogoutConfig";
import { errorBridge } from "../lib/utils";
import { getAccessToken, getRefreshToken, saveTokens } from "./tokenConfig";

export const isDevelopment = process.env.EXPO_PUBLIC_APP_ENV === "development";

export const baseURL = isDevelopment
  ? process.env.EXPO_PUBLIC_API_DEV
  : process.env.EXPO_PUBLIC_API_PROD;

export const axiosConfig = axios.create({
  baseURL,
  timeout: 15000,
});

let refreshPromise = null;

const refreshTokens = async () => {
  if (!refreshPromise) {
    refreshPromise = axiosConfig
      .get("/auth/refreshtoken")
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data;

        await saveTokens({ accessToken, refreshToken });

        return { accessToken, refreshToken };
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
        await refreshTokens();

        const newAccess = await getAccessToken();
        const newRefresh = await getRefreshToken();

        if (newAccess)
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        if (newRefresh)
          originalRequest.headers["refresh-token"] = `Bearer ${newRefresh}`;

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
