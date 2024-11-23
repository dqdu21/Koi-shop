import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Card } from '@/components/ui/card';
import { CartItem } from '../../models/cart';

interface CartSummaryProps {
  price_paid: number;
  price: number;
  discount: number;
  cartItems: CartItem[];
  selectedItems: Set<string>;
  onSelect: (id: string, selected: boolean) => void;
  onPay: () => void;
  onApplyVoucher: (voucherCode: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  price_paid,
  price,
  discount,
  cartItems,
  selectedItems,
  onSelect,
  onPay,
  onApplyVoucher,
}) => {
  const [voucherCode, setVoucherCode] = useState('');

  const handleApplyVoucher = () => {
    onApplyVoucher(voucherCode); 
  };

  return (
    <Card className="p-4 h-max my-2">
      <div className="space-y-4">
        <h2 className="font-semibold">Cart Summary</h2>
        <div className="flex justify-between">
          <div>Total Price:</div>
          <div>{price.toLocaleString('vi-vn')}</div>
        </div>
        <div className="flex justify-between">
          <div>Total Discount:</div>
          <div>{discount.toLocaleString('vi-vn')}</div>
        </div>
        <div className="h-px w-full bg-gray-500"></div>
        <div className="flex justify-between">
          <div>Price Paid:</div>
          <div className="font-bold">{price_paid.toLocaleString('vi-vn')}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button type="primary" onClick={handleApplyVoucher}>
            Apply
          </Button>
        </div>
        <Button className="w-full bg-red-400 text-white" onClick={onPay}>
          Thanh toán
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;
