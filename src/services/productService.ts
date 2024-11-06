import { axiosInstance } from "./axiosInstance";

export const GetAllProduct = async () => {
  try {
    const res = await axiosInstance.post("/product/query",
      {
        page: 1,
        pageSize: 100,
      }
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }


}

export const addProduct = async (data: any) => {
  try {
    const res = await axiosInstance.post("/product",
      data
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}
