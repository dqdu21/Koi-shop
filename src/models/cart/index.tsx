// Define the types
export type CartItem = {
    status: string;
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
    isBatch: boolean;
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      gender: string;
      inventory: number;
      categoryId: string;
      createdAt: Date;
      updatedAt: Date;
      batches: {
        id: string;
        name: string;
        quantity: number;
        price: number;
      }[];
    };
  };
  
  export type CartData = {
    product: any;
    discount: number;
    price: number;
    id: string;
    userId: string;
    totalPrice: number;
    totalItem: number;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    cartItems: CartItem[];
  };
  
  export type DataTransfer = {
    searchCondition: {
      status: string;
      is_deleted: boolean;
    };
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
  };
  
  export type CartSearchResponse = {
    success: boolean;
    data: {
      pageData: CartData[];
      pageInfo: {
        pageNum: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
    };
  };
  