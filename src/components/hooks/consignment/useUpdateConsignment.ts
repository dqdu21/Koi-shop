// src/hooks/useUpdateConsignment.ts
import { useState } from "react";
import { message } from "antd";
import { updateConsignment } from "../../../services/consignmentService";
import { ConsignmentOnline, ConsignmentOffline } from "../../../models/consignment";

const useUpdateConsignment = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const updateConsignmentById = async (consignmentId: string, data: Partial<ConsignmentOnline & ConsignmentOffline>) => {
    setLoading(true);
    try {
      await updateConsignment(consignmentId, data);
      message.success("Consignment updated successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to update consignment");
    } finally {
      setLoading(false);
    }
  };

  return { updateConsignmentById, loading };
};

export default useUpdateConsignment;
