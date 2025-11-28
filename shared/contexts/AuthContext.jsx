import { useRouter, useSegments } from "expo-router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setLogoutFunction } from "@/features/auth/config/globalLogoutConfig";
import { authService } from "@/features/auth/services/authServices";
import { clearTokens, getRefreshToken, saveTokens } from "@/shared/config/tokenConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const segments = useSegments();

  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuthGroup = segments[0] === "(auth)";

  useEffect(() => {
    const init = async () => {
      try {
        const refresh = await getRefreshToken();

        if (!refresh) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        const loggedInUser = await authService.getCurrentUser();
        if (loggedInUser) {
          setUser(loggedInUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log("Error fetching user:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setInitialLoading(false);
      }
    };

    init();
  }, []);

  // --- LOGOUT ---
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.log("Logout API error:", err);
    }

    await clearTokens();

    setUser(null);
    setIsAuthenticated(false);

    router.replace("/auth/login");
  }, []);

  useEffect(() => {
    setLogoutFunction(logout);
  }, [logout]);

  const loginSuccess = async ({ user, accessToken, refreshToken }) => {
    await saveTokens({ accessToken, refreshToken });

    setUser(user);
    setIsAuthenticated(true);

    router.replace("/(tabs)/home");
  };

  const updateUser = (newUserData) =>
    setUser((prev) => ({ ...prev, ...newUserData }));

  console.log("initialLoading", initialLoading, "isAuthenticated: ", isAuthenticated, "user:", user)
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        initialLoading,
        loading,
        logout,
        updateUser,
        loginSuccess,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
