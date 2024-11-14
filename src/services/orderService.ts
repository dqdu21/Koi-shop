import { axiosInstance } from './axiosInstance';
import { getAddressOwn } from './addressService';

export const payOrder = async (cartId: string) => {
  try {
    //  const res = await getAddressOwn()
    //  console.log(res);
    //  const addressId = res.result.data[0].id;
    //  console.log(res)
    const res = await axiosInstance.post(`/order/cart/${cartId}`, {
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
    return res.data;
  }
  catch (err: any) {
    console.error(err.message);
  }
}


export const getOrderHistory = async () => {
  try {
    const res = await axiosInstance.get("/order/own");
    return res.data.result.data;
  } catch (error) {
    console.error(error)
  }
}

// export const GetOrders = async () => {
//   try {
//     const res = await axiosInstance.get("/order/admin/query");
//     return res.data.result.data;
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return [];
//   }
// };
