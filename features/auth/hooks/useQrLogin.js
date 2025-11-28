import { useState, useCallback } from "react";
import { authService } from "../services/authServices";

export const useQrLogin = (onSuccess, onError) => {
  const [qrId, setQrId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveQrId = useCallback((value) => {
    setQrId(value);
    setError("")
  }, []);

  const clearQrId = useCallback(() => {
    setQrId(null);
  }, []);

  const handleSubmit = async () => {
    if (!qrId) {
      setError("QrId are required");
      return false;
    }

    setError("");
    setLoading(true);

    try {
      const response = await authService.a({
        qrId,
      });

      if (response?.success) {
        onSuccess?.(response.data);
        return true;
      }

      clearQrId();
      return false;
    } catch (err) {
      const errorMsg = err?.message || "Qr Login failed. Please try again.";
      setError(errorMsg);
      onError?.(errorMsg);
      clearQrId();
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    qrId,
    saveQrId,
    clearQrId,
    handleSubmit,
    loading,
    error,
    setError,
  };
};
