import { useState, useCallback } from "react";

export const useQrLogin = () => {
  const [qrId, setQrId] = useState(null);

  const saveQrId = useCallback((value) => {
    setQrId(value);
  }, []);

  const clearQrId = useCallback(() => {
    setQrId(null);
  }, []);

  return { qrId, saveQrId, clearQrId };
};
