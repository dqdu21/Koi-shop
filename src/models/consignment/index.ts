// Kiểu chung cho Product trong Consignment
interface ProductDetails {
  name: string;
  description: string;
  price: number;
  origin: string;
  age: number;
  length: number;
  species: string;
  color: string;
  feedingVolumn: string;
  filterRate: number;
  gender: string;
}

// Kiểu dữ liệu cho ConsignmentData, chứa thông tin chung của một consignment
export interface ConsignmentData {
  id: string;
  userId: string;
  method: string; // Ví dụ: "Online" hoặc "Offline"
  commissionPercentage: number;
  dealingAmount: number;
  status: string;
  isForSell: boolean;
  createdAt: string;
  product: ProductDetails; // Sử dụng kiểu ProductDetails ở trên
}

// Kiểu dữ liệu cho ConsignmentOnline
export type ConsignmentOnline = {
  orderId: string; // Mã định danh đơn hàng
  orderItemId: string; // Mã định danh mục hàng trong đơn hàng
  commissionPercentage: number; // Tỷ lệ hoa hồng (phần trăm)
  consignmentFee: number; // Phí ký gửi
  expiryDate: Date; // Ngày hết hạn ký gửi
  dealingAmount: number; // Số tiền giao dịch
  isForSell: boolean; // Trạng thái có phải để bán không
};

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

export interface ConsignmentOffline {
  id: string;
  userId: string;
  method: string;
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


// Kiểu dữ liệu cho DataTransfer khi tìm kiếm consignment
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

// Kiểu dữ liệu cho phản hồi tìm kiếm Consignment
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
