// components/cart/CartItem.tsx

import React from 'react';
import { CartItem as CartItemType } from '../../models/cart';
import {
  Card,
} from "@/components/ui/card"

import { Trash } from 'lucide-react';



interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void; // Updated to accept selected state
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, isSelected, onSelect }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(item.id, event.target.checked);
  };


  return (

    <Card className='px-8 py-4 my-2 grid grid-cols-[1fr_4fr_1fr] gap-2'>
      <img
        src={item.product ? item.product.imageUrl : ""} // Fetches image based on product ID

        className="w-32 h-auto rounded-md" // Optional: style for image
        onError={(e) => {
          e.currentTarget.src =
            "https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"; // Fallback image if loading fails
        }}
      />
      <div className="">

      <h2 className="font-semibold">{item.product ? item.product.name: item.batch.name}</h2>
      <p>Quantity: {item.quantity}</p>
      <p>Total: {(item.product ? item.product.price : item.batch.price).toLocaleString('vi-vn')}</p>
      </div>
      <div className="flex justify-end items-center cursor-pointer" onClick={() => onRemove(item.id)}>
        <Trash />
      </div>

    </Card>
    // <div>
    //   {/* Render your cart item details here */}
    //   <h2>{item.productId}</h2> {/* Adjust to match your item structure */}
    //   <input
    //     type="checkbox"
    //     checked={isSelected}
    //     onChange={handleCheckboxChange}
    //   />
    //   <button onClick={() => onRemove(item.id)}>Remove</button>
    //   {/* Display totalPrice or other properties */}
    //   <p>Total Price: {item.totalPrice}</p>
    //   {/* Display discount if it exists */}
    //   {item.discount && <p>Discount: {item.discount}</p>}
    // </div>
  );
};

export default CartItem;