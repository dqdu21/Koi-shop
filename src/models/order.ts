// models/order.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    origin: string;
    age: number;
    weight: number;
    length: number;
    species: string;
    color: string;
    feedingVolumn: string;
    filterRate: number;
    gender: string;
    inventory: number;
    isForSell: boolean;
    categoryId: string;
    consignmentId?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    promotions?: any[];
    medias?: any[];
  }
  
  export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    batchId: string;
    quantity: number;
    price: number;
    isBatch: boolean;
    product: Product;
  }
  
  export interface Order {
    id: string;
    userId: string;
    addressId: string;
    serviceId: number;
    serviceTypeId: number;
    totalWeight: number;
    totalPrice: number;
    totalItem: number;
    contactNumber: string;
    contactName: string;
    shippingFee: number;
    discount: number;
    isUsePoint: boolean;
    paymentMethod: string;
    estimatedDeliveryDate: string;
    note: string;
    currency: string;
    status: string;
    isReBuy: boolean;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
  }
  