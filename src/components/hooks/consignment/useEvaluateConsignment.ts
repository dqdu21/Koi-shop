import { useState } from "react";
import { message } from "antd";
import { evaluateConsignment } from "../../../services/consignmentService";

const useEvaluateConsignment = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const evaluate = async (consignmentId: string, isApproved: boolean) => {
    setLoading(true);
    try {
      await evaluateConsignment(consignmentId, isApproved);
      message.success(isApproved ? "Consignment approved" : "Consignment rejected");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to evaluate consignment");
    } finally {
      setLoading(false);
    }
  };

  return { evaluate, loading };
};

export default useEvaluateConsignment;
