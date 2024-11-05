// components/cart/CartSummary.tsx

import React from 'react';
import { CartItem } from '../../models/cart';
import { Card } from '@/components/ui/card';
import { Button} from "@/components/ui/button"

interface CartSummaryProps {
  price_paid: number;
  price: number;
  discount: number;
  cartItems: CartItem[];
  selectedItems: Set<string>;
  onRemove: (id: string) => void;
  onSelect: (id: string, selected: boolean) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  price_paid,
  price,
  discount,
  cartItems,
  selectedItems,
  onRemove,
  onSelect,
}) => {
  return (
    <Card className='p-4 h-max'>
    <div className='space-y-4'>
      <h2 className='font-semibold'>Cart Summary</h2>
      <div className='flex justify-between'><div>Total Price:</div> <div>{price.toLocaleString('vi-vn')}</div></div>
      <div className='flex justify-between'><div>Total Discount:</div> <div>{discount}</div></div>
      <div className="h-px w-full bg-gray-500"></div>
      <div className='flex justify-between'><div>Price Paid:</div> <div className='font-bold'>{price_paid.toLocaleString('vi-vn')}</div></div>
      <Button className='w-full bg-red-400 text-white'>Thanh toán</Button>
      {/* Additional summary information can be displayed here */}
    </div>
    </Card>
  );
};

export default CartSummary;
