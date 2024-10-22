import React, { useEffect, useState } from 'react';
import CartItem from '../components/cart/CartItem'; 
import CartSummary from '../components/cart/CartSummary'; 
import { CartData } from '../models/cart'; 
import { notification } from 'antd';
import AppHeader from '../components/layout/AppHeader'; // Import the AppHeader
import AppFooter from '../components/layout/AppFooter'; // Import the AppFooter
import { deleteCartAPI, getCartsAPI } from '../services/cartService';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [pricePaid, setPricePaid] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const dataTransfer = new DataTransfer(); 
        const id = 'da17c01a-de60-4b46-810e-f824a1936e14'; 
        const cartData = await getCartsAPI(dataTransfer, id);
        setCartItems(cartData);
        calculateCartSummary(cartData);
      } catch (error: any) {
        notification.error({ message: 'Error', description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await deleteCartAPI(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      notification.success({
        message: 'Success',
        description: 'Item removed from cart.',
      });
    } catch (error: any) {
      notification.error({ message: 'Error', description: error.message });
    }
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (selected) {
        updatedSelected.add(id);
      } else {
        updatedSelected.delete(id);
      }
      return updatedSelected;
    });
  };

  const calculateCartSummary = (cartItems: CartData[]) => {
    let totalPrice = 0;
    let totalDiscount = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price;
      totalDiscount += item.product.discount || 0;
    });
    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setPricePaid(totalPrice - totalDiscount);
  };

  return (
    <>
      <AppHeader /> 
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="mb-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            <CartSummary
              price_paid={pricePaid}
              price={price}
              discount={discount}
              cartItems={cartItems}
              selectedItems={selectedItems}
              onRemove={handleRemove}
              onSelect={handleSelect}
            />
          </>
        )}
      </div>
      
      <AppFooter /> 
    </>
  );
};

export default CartPage;
