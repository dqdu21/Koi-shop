// models/consignment.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  origin?: string;
  age?: number;
  length?: number;
  species?: string;
  color?: string;
  feedingVolume?: string; 
  filterRate?: number;
  gender: string;
  inventory?: number;
  categoryId?: string;
  status?: string;
  createdAt?: string;
}

// ConsignmentData Interface
export interface ConsignmentData {
  id: string;
  userId: string;
  method: "online" | "offline"; 
  commissionPercentage: number;
  dealingAmount: number;
  status: string;
  isForSell: boolean;
  createdAt: Date; 
  product: Product;
}

// ConsignmentOnline Interface
export type ConsignmentOnline = {
  orderId: string;
  orderItemId: string;
  commissionPercentage: number;
  consignmentFee: number;
  expiryDate: Date | string; // Date hoặc string
  dealingAmount: number;
  isForSell: boolean;
};

// ConsignmentOffline Interface
export interface ConsignmentOffline {
  id: string;
  userId: string;
  method: "offline";
  commissionPercentage: number;
  dealingAmount: number;
  status: string;
  isForSell: boolean;
  createdAt: string;
  updatedAt: string;
  consignmentFee: number;
  expiryDate?: string;
  isBatch?: boolean;
  product: Product;
}

// DataTransfer Interface for search conditions
export type DataTransfer = {
  searchCondition: {
    keyword?: string;
    isForSell?: boolean;
    categoryId?: string;
    isDeleted?: boolean;
    consignmentType?: "online" | "offline";
    userId?: string;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

// ConsignmentSearchResponse Interface for search responses
export interface ConsignmentSearchResponse<T> {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  result: {
    data: T[];
    paginationResp: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}
