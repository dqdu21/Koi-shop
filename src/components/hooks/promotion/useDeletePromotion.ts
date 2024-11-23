import { message } from "antd";
import { useState } from "react";
import { deletePromotionAPI } from "@/services/promotionService";

const useDeletePromotion = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePromotion = async (id: string) => {
    try {
      setLoading(true);
      await deletePromotionAPI(id);
      message.success("Promotion deleted successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to delete promotion");
    } finally {
      setLoading(false);
    }
  };

  return { deletePromotion, loading };
};

export default useDeletePromotion;
