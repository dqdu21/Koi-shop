// src/hooks/useRefreshData.ts
import { useState } from "react";

const useRefreshData = (fetchData: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { refresh, loading };
};

export default useRefreshData;
