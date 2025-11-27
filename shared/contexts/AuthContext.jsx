import { createContext, useState, useEffect, useContext, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../features/auth/services/authServices";
import { setLogoutFunction } from "../../features/auth/config/globalLogoutConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Routes that don't require auth check
  const publicRoutes = [
    "/auth/login",
    "/auth/temp-login",
    "/auth/set-password",
    "/auth/upload-id",
    "/auth/live-photo",
    "/auth/identity-verification",
    "/auth/terms",
    "/auth/otp-verification",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/invite/verify",
    "/auth/result",
  ];

  const isPublicRoute = useCallback((pathname) => {
    return publicRoutes.some(route => pathname.startsWith(route));
  }, []);

  useEffect(() => {
    const init = async () => {
      if (isPublicRoute(location.pathname)) {
        setInitialLoading(false);
        setLoading(false);
        return;
      }

      // Only fetch user if not already loaded
      if (!user) {
        try {
          const loggedInUser = await authService.getCurrentUser();
          if (loggedInUser) {
            setUser(loggedInUser);
            console.log("✅ User authenticated:", loggedInUser.email);
            setIsAuthenticated(true);
          } else {
            // No user found, redirect to login if not on public route
            if (!isPublicRoute(location.pathname)) {
              setIsAuthenticated(false);
              //   navigate(ROUTES.AUTH.LOGIN, { replace: true });
            }
          }
        } catch (err) {
          // Error fetching user - likely 401 (not authenticated)
          console.log("ℹ️ User not authenticated");
          setUser(null);
          setIsAuthenticated(false);
          // Only redirect if not already on a public route
          if (!isPublicRoute(location.pathname)) {
            // navigate(ROUTES.AUTH.LOGIN, { replace: true });
          }
        } finally {
          setInitialLoading(false);
          setLoading(false);
        }
      } else {
        setInitialLoading(false);
        setLoading(false);
      }
    };

    init();
  }, [user, isPublicRoute]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      isAuthenticated(false);
    } catch (err) {
      isAuthenticated(false);
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      //   navigate(ROUTES.AUTH.LOGIN, { replace: true });
    }
  }, []);

  useEffect(() => {
    setLogoutFunction(logout);
  }, [logout]);

  const updateUser = (newUserData) => {
    setUser((prev) => ({ ...prev, ...newUserData }));
  };

  console.log("AuthContext - isAuthenticated:", isAuthenticated, "initialLoading:", initialLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        updateUser,
        loading,
        isAuthenticated,
        setIsAuthenticated,
        initialLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
