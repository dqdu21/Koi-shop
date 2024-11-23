import { useState, useEffect } from "react";
import { getPromotionsAPI } from "@/services/promotionService";

const useGetPromotions = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const result = await getPromotionsAPI();
      setPromotions(result.data);
    } catch (error: any) {
      console.error("Failed to fetch promotions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return { promotions, loading, refetch: fetchPromotions };
};

export default useGetPromotions;
