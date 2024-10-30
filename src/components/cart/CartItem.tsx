// components/cart/CartItem.tsx

import React from 'react';
import { CartItem as CartItemType } from '../../models/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void; // Updated to accept selected state
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, isSelected, onSelect }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(item.id, event.target.checked);
  };

  return (
    <div>
      {/* Render your cart item details here */}
      <h2>{item.productId}</h2> {/* Adjust to match your item structure */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <button onClick={() => onRemove(item.id)}>Remove</button>
      {/* Display totalPrice or other properties */}
      <p>Total Price: {item.totalPrice}</p>
      {/* Display discount if it exists */}
      {item.discount && <p>Discount: {item.discount}</p>}
    </div>
  );
};

export default CartItem;
