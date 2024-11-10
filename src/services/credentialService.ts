import { axiosInstance } from "./axiosInstance";

export const getCredentialByProductId = async (productId: string) => {
  try {
    const res = await axiosInstance.get(`/credential/product/${productId}`);
    return res.data.result;
  } catch (error) {
    console.error(error)
  }
}

export const createCredential = async (data: any) => {
  try {
    const res = await axiosInstance.post("/credential",data);
  } catch (error) {
    console.error(error)
  }
}
