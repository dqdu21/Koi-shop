import { useState } from "react";
import { message } from "antd";
import { payConsignment } from "../../../services/consignmentService";

const usePayConsignment = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const pay = async (consignmentId: string) => {
    setLoading(true);
    try {
      await payConsignment(consignmentId);
      message.success("Payment successful");
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return { pay, loading };
};

export default usePayConsignment;
