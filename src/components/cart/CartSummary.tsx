// components/cart/CartSummary.tsx

import React from 'react';
import { CartItem } from '../../models/cart';
import { Card } from '@/components/ui/card';

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
    <div>
      <h2>Cart Summary</h2>
      <p>Total Price: {price}</p>
      <p>Total Discount: {discount}</p>
      <p>Price Paid: {price_paid}</p>
      {/* Additional summary information can be displayed here */}
    </div>
  );
};

export default CartSummary;
