import { useEffect, useState } from "react";
import { message } from "antd";
import { vnpaymentReturn } from "../../../services/consignmentService";

const useVnPaymentReturn = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      const result = await vnpaymentReturn();
      setPaymentStatus(result.status);
      message.success("Payment status retrieved");
    } catch (error: any) {
      message.error(error.message || "Failed to retrieve payment status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  return { paymentStatus, loading };
};

export default useVnPaymentReturn;
