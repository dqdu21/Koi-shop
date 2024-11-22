import { Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import { getCartsAPI, removeProductFromCart } from '../services/cartService';
import { CartData, CartItem as CartItemType } from '../models/cart'; // Import the types
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { useAuth } from "../routes/AuthContext";
import { payOrder } from '@/services/orderService';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [pricePaid, setPricePaid] = useState(0);
  const [voucherCode, setVoucherCode] = useState(''); // Thêm state cho voucher
  const { collapsed } = useSider();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [isLoggedIn]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await getCartsAPI();
      if (response.isSuccess && response.result.data.length > 0) {
        const cart = response.result.data[0]; // Get the first cart
        setCartItems(cart.cartItems); // Get cart items from the response
        calculateCartSummary(cart.cartItems);
      } else {
        notification.info({ message: 'Info', description: 'No cart found.' });
      }
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCartSummary = (cartItems: CartItemType[]) => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
      totalDiscount += item.discount || 0;
    });

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setPricePaid(totalPrice - totalDiscount);
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems((prev) => {
      const updatedSelectedItems = new Set(prev);
      if (selected) {
        updatedSelectedItems.add(id);
      } else {
        updatedSelectedItems.delete(id);
      }
      return updatedSelectedItems;
    });
  };

  const removeItem = async (productId: string, quantity: number) => {
    try {
      await removeProductFromCart(user.cartId, productId, quantity);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handlePay = async () => {
    try {
      const res = await payOrder(user.cartId);
      window.location.href = res.result.data.paymentUrl;
      fetchCartItems();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleApplyVoucher = async (voucherCode: string) => {
    try {
      // Gọi API áp dụng mã voucher
      const response = await fetch('/api/voucher/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucherCode,
          cartId: user.cartId,
        }),
      });

      const result = await response.json();
      if (result.success) {
        notification.success({ message: 'Voucher applied successfully!' });
        setDiscount(result.discountAmount);
        setPricePaid(price - result.discountAmount);
      } else {
        notification.error({ message: 'Failed to apply voucher.', description: result.message });
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
      notification.error({ message: 'Error applying voucher.' });
    }
  };

  return (
    <Layout className="h-screen w-screen flex flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider className="sider" collapsed={collapsed} collapsedWidth={0} trigger={null} width={220}>
          <AppSider className={`transition-all duration-75 ${collapsed ? 'w-0' : 'w-64'}`} />
        </Sider>
        <Layout className="flex flex-col flex-1">
          <Content className="flex-1 overflow-auto">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

              {loading ? (
                <p>Loading...</p>
              ) : !isLoggedIn ? (
                <div>
                  <p>Please sign in to view your cart.</p>
                </div>
              ) : cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="grid grid-cols-[2fr_1fr] gap-4">
                      <div>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
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
                        onSelect={handleSelect}
                        onPay={handlePay}
                        onApplyVoucher={handleApplyVoucher} // Truyền hàm áp dụng voucher
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CartPage;
