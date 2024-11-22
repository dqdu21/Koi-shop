import React, { useState } from 'react';
import { CartItem } from '../../models/cart';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  price_paid: number;
  price: number;
  discount: number;
  cartItems: CartItem[];
  selectedItems: Set<string>;
  onSelect: (id: string, selected: boolean) => void;
  onPay: () => void;
  onApplyVoucher: (voucherCode: string) => void; // Callback để áp dụng voucher
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
  const [voucherCode, setVoucherCode] = useState(''); // State để lưu mã voucher

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      alert('Please enter a valid voucher code.');
      return;
    }
    onApplyVoucher(voucherCode); // Gọi callback để áp dụng voucher
    setVoucherCode(''); // Xóa mã voucher sau khi áp dụng
  };

  return (
    <Card className="p-4 h-max my-2 space-y-4">
      <h2 className="font-semibold text-lg">Cart Summary</h2>
      <div className="flex justify-between text-sm">
        <div>Total Price:</div>
        <div>{price.toLocaleString('vi-VN')} VND</div>
      </div>
      <div className="flex justify-between text-sm">
        <div>Total Discount:</div>
        <div>{discount.toLocaleString('vi-VN')} VND</div>
      </div>
      <div className="h-px w-full bg-gray-500"></div>
      <div className="flex justify-between font-semibold text-base">
        <div>Price Paid:</div>
        <div>{price_paid.toLocaleString('vi-VN')} VND</div>
      </div>
      <Button className="w-full bg-red-400 text-white" onClick={onPay}>
        Thanh toán
      </Button>

      {/* Voucher Input */}
      <div className="mt-4">
        <label htmlFor="voucher" className="block text-sm font-medium text-gray-700">
          Do you have a voucher?
        </label>
        <div className="flex mt-2">
          <input
            type="text"
            id="voucher"
            className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button
            className="rounded-r-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            onClick={handleApplyVoucher}
          >
            Apply
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;
