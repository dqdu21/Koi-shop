import { message } from "antd";
import { useState } from "react";
import { createPromotionAPI } from "@/services/promotionService"; 
import { Promotion } from "@/models/promotion/Promotion"; 

const useAddPromotion = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const createPromotion = async (promotionData: Omit<Promotion, "id" | "isActive" | "createdAt" | "updatedAt">) => {
    try {
      setLoading(true);
      await createPromotionAPI(promotionData);
      message.success("Promotion added successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to add promotion");
    } finally {
      setLoading(false);
    }
  };
  

  return { createPromotion, loading };
};

export default useAddPromotion;
