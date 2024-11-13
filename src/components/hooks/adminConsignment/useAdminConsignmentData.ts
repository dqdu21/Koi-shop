// components/hooks/adminConsignment/useAdminConsignmentData.ts
import { useEffect, useState } from "react";
import { message } from "antd";
import { queryAdminConsignments } from "@/services/consignmentService";
import { ConsignmentOffline, ConsignmentOnline } from "@/models/consignment";

const useAdminConsignmentData = () => {
    const [data, setData] = useState<(ConsignmentOffline | ConsignmentOnline)[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchConsignments = async () => {
        setLoading(true);
        try {
            const result = await queryAdminConsignments({
                searchCondition: {},
                pageInfo: { pageNum: 1, pageSize: 10 },
            });
            if (result && result.isSuccess && result.result) {
                setData(result.result.data);
            } else {
                message.error("Failed to load consignments.");
            }
        } catch (error: any) {
            message.error(error.message || "Failed to fetch consignments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsignments();
    }, []);

    return { data, loading, refetch: fetchConsignments };
};

export default useAdminConsignmentData;
