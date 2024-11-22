import { axiosInstance } from "./axiosInstance";

export const GetAllBatch = async () => {
  try {
    const res = await axiosInstance.get("/batch",
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const addBatch = async (data: any) => {
  try {
    const res = await axiosInstance.post("/batch",
      data
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const deleteBatch = async (id:string) => {
  try {
    const res = await axiosInstance.delete(`/batch/${id}`
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const updateBatch = async (batchId: string, data: any) => {
  try {
    const res = await axiosInstance.put(`/batch/${batchId}`,
      data
    )
    return res.data

  } catch (err: any) {
    console.error(err)
  }
}

export const getBatch = async (batchId: string) => {
  try {
    const res = await axiosInstance.get(`/batch/${batchId}`)
    return res.data
  } catch (err:any) {
    console.error(err)
  }
}
