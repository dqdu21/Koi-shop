import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CartData } from "../../models/cart";

interface CartSummaryProps {
  price_paid: number;
  price: number;
  discount: number;
  cartItems: CartData[];
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
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/confirm-checkout");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.has(item.id), // Thay _id bằng id nếu cần
  );

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <h2 className="inline-block text-lg font-bold">Total</h2>
        <span
          className="mt-2 block h-1 bg-red-500"
          style={{
            width: "calc(15% + 4px)",
            height: "1.5px",
            marginLeft: "-2px",
            marginBottom: "2px",
          }}
        ></span>
      </div>
      <div className="mt-2 flex justify-between font-semibold">
        <span>Price</span>
        <span className="text-black">{formatCurrency(price)}</span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between">
        <span>Discount</span>
        <span className="font-semibold text-gray-500">
          {formatCurrency(discount)}
        </span>
      </div>
      <hr className="mt-6" />
      <div className="mt-2 flex justify-between font-bold">
        <span>Total</span>
        <span className="text-black">{formatCurrency(price_paid)}</span>
      </div>
      <hr className="mt-6" />

      <Modal
        title="Confirm Checkout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to check out now?</p>
        <div>
          {selectedCartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <span>{item.product.name}</span> 
              <span className="float-right">{formatCurrency(item.product.price)}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CartSummary;
