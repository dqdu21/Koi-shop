import { CartData } from '../models/cart';
import { axiosInstance } from './axiosInstance';
import { CartResponse } from '../models/cart';

export const getCartsAPI = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get('/cart/own');
  return response.data; // Ensure this returns the correct structure
};


export const addToCartAPI = async (cartId: string, productId: string) => {
  const response = await axiosInstance.post(`/cart/${cartId}/product/${productId}/add`);
  return response.data;
}

export const addBatchToCartAPI = async (cartId: string, batchId: string) => {
  const response = await axiosInstance.post(`/cart/${cartId}/batch/${batchId}/add`);
  return response.data;
}


export const createCartAPI = async (cartData: any) => {
  try {
    const res = await axiosInstance.post('/cart', cartData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const editStatusCartsAPI = async (
  cartId: string,
  status: string,
  cartItems: { _id: string; cart_no: string }[]
): Promise<void> => {
  try {
    const payload = {
      status,
      items: cartItems,
    };
    await axiosInstance.put(`/cart/update/${cartId}`, payload);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCartAPI = async (cartId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cart/delete/${cartId}`);
  } catch (error: any) {
    if (error?.response?.data?.message) {
      console.error('Error in deleteCartAPI: ', error);
      throw new Error(error.response.data.message);
    }
    console.error('Error in deleteCartAPI: ', error);
    throw new Error(error.message);
  }
};


export const removeProductFromCart = async (cartId: string, itemId: string): Promise<void> => {
  try {
    await axiosInstance.post(`/cart/${cartId}/cart-item/${itemId}/remove`);
  } catch (error: any) {
    console.error(error.message)
  }
}
