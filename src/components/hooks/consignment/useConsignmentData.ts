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
        const { data: consignments, paginationResp } = response.result;

        // Chuyển đổi dữ liệu để phù hợp với ConsignmentOffline
        const offlineData: ConsignmentOffline[] = consignments.map(item => ({
          id: item.id,
          userId: item.userId,
          method: item.method,
          commissionPercentage: item.commissionPercentage ?? 0,
          dealingAmount: item.dealingAmount ?? 0,
          status: item.status,
          isForSell: item.isForSell ?? false,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          consignmentFee: item.consignmentFee ?? 0,
          expiryDate: item.expiryDate || null,
          isBatch: item.isBatch ?? false,
          product: {
            id: item.product?.id || "N/A",
            name: item.product?.name || "Unknown Product",
            description: item.product?.description || "No Description",
            price: item.product?.price ?? 0,
            origin: item.product?.origin || "Unknown Origin",
            age: item.product?.age ?? 0,
            length: item.product?.length ?? 0,
            species: item.product?.species || "Unknown Species",
            color: item.product?.color || "Unknown Color",
            feedingVolume: item.product?.feedingVolumn || "N/A",
            filterRate: item.product?.filterRate ?? 0,
            gender: item.product?.gender || "Unknown Gender",
          },
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
