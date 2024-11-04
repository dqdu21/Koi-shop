import { useCallback } from "react";
import axios from "axios";
import { ConsignmentOffline } from "../../../models/consignment";

const useConsignmentDetail = () => {
  const fetchConsignmentDetail = useCallback(async (id: string): Promise<{ result: { data: ConsignmentOffline } }> => {
    const response = await axios.get(`/consignments/${id}`);
    return response.data;
  }, []);

  return { fetchConsignmentDetail };
};

export default useConsignmentDetail;
