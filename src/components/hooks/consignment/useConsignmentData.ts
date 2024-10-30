// src/hooks/useConsignmentData.ts
import { useEffect, useState } from "react";
import { message } from "antd";
import { ConsignmentOnline, ConsignmentOffline } from "../../../models/consignment";
import { getConsignment, queryConsignmentsAdmin, queryOwnConsignments } from "../../../services/consignmentService";

const useConsignmentData = (consignmentId?: string, isAdmin?: boolean, queryData?: DataTransfer) => {
  const [data, setData] = useState<ConsignmentOnline | ConsignmentOffline | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConsignment = async () => {
    setLoading(true);
    try {
      if (consignmentId) {
        const result = await getConsignment(consignmentId);
        setData(result);
      } 
    } catch (error: any) {
      message.error(error.message || "Failed to fetch consignment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsignment();
  }, [consignmentId, isAdmin, queryData]);

  return { data, loading, refetch: fetchConsignment };
};

export default useConsignmentData;
