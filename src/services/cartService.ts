import { CartData } from '../models/cart';
import { axiosInstance } from './axiosInstance';

export const getCartsAPI = async (
  dataTransfer: DataTransfer,
  id: string,
): Promise<CartData[]> => {
  try {
    const res = await axiosInstance.post(`/cart/${id}`, dataTransfer);
<<<<<<< Updated upstream
    console.log(res.data); // Kiểm tra dữ liệu trả về
=======
>>>>>>> Stashed changes
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};


export const createCartAPI = async (cartData: Partial<CartData>) => {
  try {
    const res = await axiosInstance.post('/cart/create', cartData);
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

