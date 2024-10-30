export type ConsignmentOnline = {
  orderId: string; // Mã định danh đơn hàng
  orderItemId: string; // Mã định danh mục hàng trong đơn hàng
  commissionPercentage: number; // Tỷ lệ hoa hồng (phần trăm)
  consignmentFee: number; // Phí ký gửi
  expiryDate: Date; // Ngày hết hạn ký gửi
  dealingAmount: number; // Số tiền giao dịch
  isForSell: boolean; // Trạng thái có phải để bán không
};

export type ConsignmentOffline = {
  name: string; // Tên của sản phẩm
  description: string; // Mô tả sản phẩm
  quantity: number; // Số lượng
  commissionPercentage: number; // Tỷ lệ hoa hồng (phần trăm)
  dealingAmount: number; // Số tiền giao dịch
  isForSell: boolean; // Trạng thái có phải để bán không
  origin: string; // Xuất xứ
  age: number; // Tuổi của sản phẩm (nếu là động vật)
  length: number; // Chiều dài của sản phẩm
  species: string; // Loài hoặc loại sản phẩm
  color: string; // Màu sắc
  feedingVolume: string; // Lượng thức ăn cần thiết (nếu là động vật)
  filterRate: number; // Tần suất lọc (nếu là động vật thủy sinh)
  gender: number; // Giới tính ( 0 cái, 1 đực)
  categoryId: string; // ID danh mục sản phẩm
};

export type DataTransfer = {
  searchCondition: {
    keyword?: string; // Từ khóa tìm kiếm
    isForSell?: boolean; // Lọc trạng thái có rao bán hay không
    categoryId?: string; // Lọc theo danh mục
    isDeleted?: boolean; // Lọc theo trạng thái xóa
    consignmentType?: "online" | "offline"; // Loại ký gửi
  };
  pageInfo: {
    pageNum: number; // Số trang hiện tại
    pageSize: number; // Kích thước trang
  };
};

export type ConsignmentSearchResponse<T> = {
  success: boolean; // Trạng thái thành công của yêu cầu
  data: {
    pageData: T[]; // Danh sách consignments (có thể là ConsignmentOnline[] hoặc ConsignmentOffline[])
    pageInfo: {
      pageNum: number; // Số trang hiện tại
      pageSize: number; // Kích thước trang
      totalItems: number; // Tổng số items
      totalPages: number; // Tổng số trang
    };
  };
};
