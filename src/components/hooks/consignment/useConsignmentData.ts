import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import { ConsignmentOffline } from "../../../models/consignment";
import { queryOwnConsignments } from "../../../services/consignmentService";

const useConsignmentData = (pageNum = 1, pageSize = 10) => {
  const [data, setData] = useState<ConsignmentOffline[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const fetchConsignments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await queryOwnConsignments({
        searchCondition: { isForSell: true },
        pageInfo: { pageNum, pageSize }
      });
      
      if (response?.isSuccess && response.result) {
        // Sắp xếp dữ liệu theo thời gian tạo mới nhất
        const sortedData = response.result.data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setData(sortedData); // Gán dữ liệu đã sắp xếp
        setTotalItems(response.result.paginationResp?.total || 0);
      } else {
        setData([]);
        setTotalItems(0);
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch consignment data");
    } finally {
      setLoading(false);
    }
  }, [pageNum, pageSize]);

  useEffect(() => {
    fetchConsignments();
  }, [fetchConsignments]);

  return { data, loading, totalItems, refetch: fetchConsignments };
};

export default useConsignmentData;
