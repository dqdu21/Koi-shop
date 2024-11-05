import { axiosInstance } from './axiosInstance';
import { getAddressOwn } from './addressService';

export const payOrder = async (cartId: string) => {
  try {
     const res = await getAddressOwn()
     const addressId = res.result.data[0].id;
     console.log(res,addressId)
    await axiosInstance.post(`/order/cart/${cartId}`, {
      addressId: "00000000-0000-0000-0000-000000000001",
      serviceId: 53321,
      serviceTypeId: 2,
      totalWeight: 0,
      contactNumber: "123456789",
      contactName: "Customer",
      // discountCode: "",
      paymentMethod: "VNPAY",
      note: "",
      currency: "",
      usePoint: false
    }
    )
  }
  catch (err: any) {

  }
}
