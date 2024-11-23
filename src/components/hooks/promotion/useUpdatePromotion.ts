import { message } from "antd";
import { useState } from "react";
import { updatePromotionAPI } from "@/services/promotionService"; 

const useUpdatePromotion = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updatePromotion = async (id: string, updatedData: any) => {
    try {
      setLoading(true);
      await updatePromotionAPI(id, updatedData);
      message.success("Promotion updated successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to update promotion");
    } finally {
      setLoading(false);
    }
  };

  return { updatePromotion, loading };
};

export default useUpdatePromotion;
