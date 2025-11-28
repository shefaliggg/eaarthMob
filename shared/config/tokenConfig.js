import * as SecureStore from "expo-secure-store";

const accessToken = "accessToken";
const refreshToken = "refreshToken";

// ---- GET ----
export const getAccessToken = () => SecureStore.getItemAsync(accessToken);
export const getRefreshToken = () => SecureStore.getItemAsync(refreshToken);

// ---- SAVE ----
export const saveAccessToken = (token) =>
  SecureStore.setItemAsync(accessToken, token || "");

export const saveRefreshToken = (token) =>
  SecureStore.setItemAsync(refreshToken, token || "");

export const saveTokens = async ({ accessToken, refreshToken }) => {
  if (accessToken) await saveAccessToken(accessToken);
  if (refreshToken) await saveRefreshToken(refreshToken);
};

// ---- CLEAR ----
export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(accessToken);
  await SecureStore.deleteItemAsync(refreshToken);
};

// --- OPTIONAL: return both tokens ---
export const getTokens = async () => ({
  accessToken: await getAccessToken(),
  refreshToken: await getRefreshToken(),
});
