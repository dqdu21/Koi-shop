import { axiosInstance } from './axiosInstance';

export const getAllCategory = async () => {
  try {
    const res = await axiosInstance.get(`/category`
    )
    return res.data;
  }
  catch (err: any) {
    console.error(err.message);
  }
}
