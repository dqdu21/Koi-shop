import { axiosInstance } from "./axiosInstance"; 

export const getPromotionsAPI = async () => {
  try {
    const response = await axiosInstance.get('/promotion');
    return response.data.result || []; // Trả về `result` hoặc danh sách rỗng nếu không có
  } catch (error: any) {
    console.error("Error fetching promotions:", error.message);
    throw error;
  }
};


export const createPromotionAPI = async (promotionData: any) => {
  try {
    const response = await axiosInstance.post("/promotion", promotionData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create promotion.");
  }
};

export const updatePromotionAPI = async (id: string, updatedData: any) => {
  try {
    const response = await axiosInstance.put(`/promotion/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update promotion.");
  }
};

export const deletePromotionAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/promotion/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete promotion.");
  }
};

export const startPromotionAPI = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/promotion/${id}/start`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to start promotion.");
  }
};

export const endPromotionAPI = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/promotion/${id}/end`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to end promotion.");
  }
};

export const getPromotionDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/promotion/${id}`);
    return response.data.result; // Trả về chi tiết khuyến mãi
  } catch (error: any) {
    console.error("Error fetching promotion details:", error); // Log lỗi chi tiết
    throw new Error(error.response?.data?.message || 'Failed to fetch promotion details.');
  }
};

