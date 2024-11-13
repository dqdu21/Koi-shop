import { useEffect, useState } from "react";
import { message } from "antd";
import { queryAdminConsignments, queryOwnConsignments } from "../../../services/consignmentService";
import { DataTransfer, ConsignmentOnline, ConsignmentOffline } from "../../../models/consignment";

const useQueryConsignment = (isAdmin: boolean, queryData: DataTransfer) => {
  const [data, setData] = useState<(ConsignmentOnline | ConsignmentOffline)[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConsignments = async () => {
    setLoading(true);
    try {
      const result = isAdmin
        ? await queryAdminConsignments(queryData)
        : await queryOwnConsignments(queryData);
      
      // Kiểm tra cấu trúc dữ liệu trả về
      if (result && result.isSuccess && result.result && result.result.data) {
        setData(result.result.data); // Sử dụng đúng thuộc tính từ kết quả trả về
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
