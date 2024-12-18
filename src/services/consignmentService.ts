// src/services/consignmentService.ts
import { APILink } from "../const/linkAPI";
import { axiosInstance } from "./axiosInstance";
import {
  ConsignmentOnline,
  ConsignmentOffline,
  DataTransfer,
  ConsignmentSearchResponse,
} from "../models/consignment";

// POST: /consignment/online
export const createConsignmentOnline = async (data: ConsignmentOnline) => {
  try {
    const res = await axiosInstance.post(`${APILink}/consignment/online`, data);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// POST: /consignment/offline
export const createConsignmentOffline = async (data: ConsignmentOffline) => {
  try {
    const res = await axiosInstance.post(`${APILink}/consignment/offline`, data);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// PUT: /consignment/${consignmentId}
export const updateConsignment = async (consignmentId: string, data: Partial<ConsignmentOnline & ConsignmentOffline>) => {
  try {
    const res = await axiosInstance.put(`${APILink}/consignment/${consignmentId}`, data);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// DELETE: /consignment/${consignmentId}
export const deleteConsignment = async (consignmentId: string) => {
  try {
    const res = await axiosInstance.delete(`${APILink}/consignment/${consignmentId}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// GET: /consignment/${consignmentId}
export const getConsignments = async (consignmentId: string) => {
  try {
    const res = await axiosInstance.get(`${APILink}/consignment/${consignmentId}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// POST: /consignment/admin/query
export const queryAdminConsignments = async (queryData: DataTransfer) => {
  try {
    const response = await axiosInstance.post<{ isSuccess: boolean; result: { data: ConsignmentOffline[] } }>(
      `${APILink}/consignment/admin/query`,
      queryData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching admin consignments:", error);
    throw error;
  }
};

// PUT: /consignment/{consignmentId}/evaluate?isApproved=true
export const approveConsignment = async (consignmentId: string, isApproved: boolean) => {
  try {
    const response = await axiosInstance.put(
      `${APILink}/consignment/${consignmentId}/evaluate`,
      null,
      { params: { isApproved } }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to approve consignment.");
    }
  }
};

// PUT: /consignment/${consignmentId}/pay
export const payConsignment = async (consignmentId: string) => {
  try {
    const res = await axiosInstance.put(`${APILink}/consignment/${consignmentId}/pay`);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// GET: /consignment/vnpayment-return
export const vnpaymentReturn = async () => {
  try {
    const res = await axiosInstance.get(`${APILink}/consignment/vnpayment-return`);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// POST: /consignment/user/${consignmentId}/query
export const queryConsignmentByUser = async (consignmentId: string, data: any) => {
  try {
    const res = await axiosInstance.post(`${APILink}/consignment/user/${consignmentId}/query`, data);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};

// POST: /consignment/own/query
export const queryOwnConsignments = async (data: DataTransfer) => {
  try {
    const res = await axiosInstance.post<ConsignmentSearchResponse<ConsignmentOnline | ConsignmentOffline>>(
      `${APILink}/consignment/own/query`,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};
export const queryConsignmentById = async (id: string) => {
  try {
    const res = await axiosInstance.get<{ isSuccess: boolean; result: ConsignmentOffline }>(
      `${APILink}/consignment/${id}`
    );
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch consignment detail.");
    }
  }
}


