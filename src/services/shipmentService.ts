import { axiosInstance } from './axiosInstance';


export const GetAllShipment = async () => {
  try {
    const res = await axiosInstance.post("/shipment/admin/query", {
      page: 1,
      pageSize: 100,
    });
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const addShipment = async (data: any) => {
  try {
    const res = await axiosInstance.post("/shipment", data);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const deleteShipment = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/shipment/${id}`);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const updateShipment = async (shipmentId: string, data: any) => {
  try {
    const res = await axiosInstance.put(`/shipment/${shipmentId}`, data);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const getShipment = async (shipmentId: string) => {
  try {
    const res = await axiosInstance.get(`/shipment/${shipmentId}`);
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const updateShipmentAccept = async (shipmentId: string) => {
  try {
    const res = await axiosInstance.put(`/shipment/${shipmentId}/is-accept?isAccept=true`);
    return res.data;
  } catch (error:any) {
    console.error(error);

  }
}

export const updateShipmentCancel = async (shipmentId: string) => {
  try {
    const res = await axiosInstance.put(`/shipment/${shipmentId}/cancel`);
    return res.data;
  } catch (error:any) {
    console.error(error);

  }
}


export const updateShipmentReturn = async (shipmentId: string) => {
  try {
    const res = await axiosInstance.put(`/shipment/${shipmentId}/return`);
    return res.data;
  } catch (error:any) {
    console.error(error);

  }
}

export const createShipment = async (orderId: string) => {
  try {
    const res = await axiosInstance.post(`/shipment`, {
      orderId: orderId,
      shipperId: "00000000-0000-0000-0000-000000000001"
    });
    return res.data;
  } catch (error:any) {
    console.error(error);

  }
}
