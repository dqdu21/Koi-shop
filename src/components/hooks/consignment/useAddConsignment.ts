// src/hooks/useAddConsignment.ts
import { useState } from "react";
import { message } from "antd";
import { ConsignmentOffline, ConsignmentOnline } from "../../../models/consignment";
import { createConsignmentOffline, createConsignmentOnline } from "../../../services/consignmentService";

const useAddConsignment = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const addConsignment = async (data: ConsignmentOnline | ConsignmentOffline, isOnline: boolean) => {
    setLoading(true);
    try {
      if (isOnline) {
        await createConsignmentOnline(data as ConsignmentOnline);
      } else {
        await createConsignmentOffline(data as ConsignmentOffline);
      }
      message.success("Consignment added successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to add consignment");
    } finally {
      setLoading(false);
    }
  };

  return { addConsignment, loading };
};

export default useAddConsignment;
