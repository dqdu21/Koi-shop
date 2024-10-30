// models/cart.ts

export interface CartItem {
    id: string;
    productId: string; // Assuming each item has a product ID
    totalPrice: number; // Assuming the cart item has a total price
    discount?: number;
    // Add other properties as necessary based on your API response
  }
  
  export interface CartResponse {
    statusCode: number;
    message: string;
    isSuccess: boolean;
    result: {
      data: {
        id: string;
        userId: string;
        totalPrice: number;
        totalItem: number;
        totalWeight: number;
        currency: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        cartItems: CartItem[];
      }[];
    };
  }
  
  export interface CartData {
    id: string;
    totalPrice: number;
    totalItem: number;
    totalWeight: number;
    cartItems: CartItem[];
    // Other fields as necessary
  }
  