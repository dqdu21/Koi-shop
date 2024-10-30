// src/hooks/useConsignmentDelete.ts
import { useState } from "react";
import { message } from "antd";
import { deleteConsignment } from "../../../services/consignmentService";

const useConsignmentDelete = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const deleteConsignmentById = async (consignmentId: string) => {
    setLoading(true);
    try {
      await deleteConsignment(consignmentId);
      message.success("Consignment deleted successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to delete consignment");
    } finally {
      setLoading(false);
    }
  };

  return { deleteConsignmentById, loading };
};

export default useConsignmentDelete;
