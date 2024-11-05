import { axiosInstance } from "./axiosInstance";

export const getAddressOwn = async () => {
  try {
    const res = await axiosInstance.get('/address/own');
    return res.data;
  } catch (err: any ) {
    console.error(err)
  }
}
