import { axiosInstance } from './axiosInstance';


export const payOrder = async (cartId: string) => {
  try {
    await axiosInstance.post(`/order/cart/${cartId}`, {
      addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      serviceId: 0,
      serviceTypeId: 0,
      totalWeight: 0,
      contactNumber: "123456789",
      contactName: "Customer",
      discountCode: "",
      paymentMethod: "VNPAY",
      note: "",
      currency: "",
      usePoint: true
    }
    )
  }
  catch (err: any) {

  }
}
