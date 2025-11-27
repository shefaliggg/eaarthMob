import { createContext, useContext, useState } from "react";
import { errorBridge } from "../lib/utils";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorBanner, setErrorBanner] = useState(null);

  const showError = (type, message) => {
    setErrorBanner({ type, message });
  };
  
  errorBridge.showError = showError;

  const clearError = () => setErrorBanner(null);

  return (
    <ErrorContext.Provider value={{ errorBanner, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);