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

export const deleteProduct = async (id:string) => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const updateProduct = async (productId: string, data: any) => {
  try {
    const res = await axiosInstance.put(`/product/${productId}`,
      data
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const getProduct = async (productId: string) => {
  try {
    const res = await axiosInstance.get(`/product/${productId}`

    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const updateIsForSellProduct = async (productId: string, isForSell: boolean) => {
  try {
    const res = await axiosInstance.put(`/product/${productId}/is-for-sell?isForSell=${isForSell}`
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}
