import React, { useState } from "react";
import { CartItem as CartItemType } from "../../models/cart";
import { deleteCartAPI } from "../../services/cartService";
import { Modal, notification, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  isSelected,
  onSelect,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleOk = async () => {
    setLoading(true);
    try {
      await deleteCartAPI(item.id);
      onRemove(item.id);
      notification.success({
        message: "Success",
        description: "The item has been successfully removed from the cart.",
      });
    } catch (error: any) {
      console.error("Error deleting item:", error.message);
      notification.error({
        message: "Error",
        description: `Failed to remove the item: ${error.message || "An error occurred"}`,
      });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(item.id, e.target.checked);
  };

  const price = item.product.price;
  const priceColor = "inherit"; // Default, change if there's any condition for styling

  return (
    <div className="mb-4">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative m-4 flex items-center justify-between p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="mr-4"
          />
          <div className="ml-4 flex flex-grow flex-col">
            <div>
              <span className="text-lg font-bold">{item.product.name}</span>
              <br />
              <span className="mr-5 text-sm text-gray-500">
                Cart no: {item.cartId}
              </span>
              <Tag color={item.status === "new" ? "green" : "volcano"}>
                {item.status}
              </Tag>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-1">Category:</span>
              <span className="font-semibold text-[#0ea5e9]">
                {item.product.categoryId}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="mr-4 flex-col">
              <div className="text-sm font-bold text-black">
                <span style={{ color: priceColor }}>
                  {formatCurrency(price)}
                </span>
              </div>
            </div>
            {/* Only show the delete icon if status is not "waiting_paid" */}
            {item.status !== "waiting_paid" && (
              <div className="cursor-pointer p-0 text-black">
                <DeleteOutlined onClick={showDeleteConfirm} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to remove this item from your cart?</p>
      </Modal>
    </div>
  );
};

export default CartItem;
