import { useEffect, useState } from "react";
import { message } from "antd";
import { queryConsignmentsAdmin, queryOwnConsignments } from "../../../services/consignmentService";
import { DataTransfer, ConsignmentOnline, ConsignmentOffline } from "../../../models/consignment";

const useQueryConsignment = (isAdmin: boolean, queryData: DataTransfer) => {
  const [data, setData] = useState<(ConsignmentOnline | ConsignmentOffline)[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConsignments = async () => {
    setLoading(true);
    try {
        const result = isAdmin
          ? await queryConsignmentsAdmin(queryData)
          : await queryOwnConsignments(queryData);
        
        if (result && result.data && result.data.pageData) {
          setData(result.data.pageData);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error: any) {
        message.error(error.message || "Failed to fetch consignments");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchConsignments();
  }, [queryData]);

  return { data, loading, refetch: fetchConsignments };
};

export default useQueryConsignment;
