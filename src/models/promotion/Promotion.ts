export interface Promotion {
    id: string; // ID của khuyến mãi
    name: string; // Tên khuyến mãi
    description: string; // Mô tả chi tiết
    discountCode: string; // Mã giảm giá
    discountPercentage: number; // Phần trăm giảm giá
    startDate: string; // Ngày bắt đầu
    endDate: string; // Ngày kết thúc
    isActive: boolean; // Trạng thái kích hoạt
    createdAt: string; // Ngày tạo
    updatedAt: string; // Ngày cập nhật
  }
  export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    isSuccess: boolean;
    result: {
      data: T;
      paginationResp?: Pagination;
    };
  }
  
  export interface Pagination {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  }
  