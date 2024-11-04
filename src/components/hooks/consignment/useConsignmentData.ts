import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import { ConsignmentOffline, DataTransfer, ConsignmentSearchResponse } from "../../../models/consignment";
import { queryOwnConsignments } from "../../../services/consignmentService";

const useConsignmentData = (pageNum = 1, pageSize = 10) => {
  const [data, setData] = useState<ConsignmentOffline[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const fetchConsignments = useCallback(async () => {
    setLoading(true);
    try {
      const queryData: DataTransfer = {
        searchCondition: {
          isForSell: true,
        },
        pageInfo: {
          pageNum,
          pageSize,
        },
      };

      const response = await queryOwnConsignments(queryData);
      console.log("API response:", response);

      // Kiểm tra và lấy dữ liệu từ phản hồi API
      if (response?.isSuccess && response.result) {
        const { data, paginationResp } = response.result;

        // Chuyển đổi dữ liệu để phù hợp với ConsignmentOffline
        const offlineData = data.map(item => ({
          _id: item.id, // Đổi 'id' thành '_id' cho Ant Design rowKey
          userId: item.userId,
          name: "Sample Name", // Nếu API không có thuộc tính này, có thể đặt tên mặc định hoặc lấy từ dữ liệu khác nếu có
          description: "Sample Description", // Tương tự cho description
          quantity: 1, // Đặt mặc định hoặc tính toán nếu có
          dealingAmount: 100, // Đặt giá trị mẫu hoặc từ API nếu có
          createdAt: new Date().toISOString(), // Thời gian tạo mẫu hoặc từ API
        }));

        setData(offlineData); // Đặt dữ liệu đã chuyển đổi vào state
        setTotalItems(paginationResp?.total || 0); // Đặt tổng số mục
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
