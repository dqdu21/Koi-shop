import { Layout, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import { getCartsAPI, removeProductFromCart } from '../services/cartService';
import { getPromotionDetailsAPI, getPromotionsAPI } from '../services/promotionService'; // Import API lấy danh sách khuyến mãi
import { CartItem as CartItemType } from '../models/cart';
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
  const { collapsed } = useSider();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { isLoggedIn, user } = useAuth();
  const [promotions, setPromotions] = useState<any[]>([]); // Lưu danh sách khuyến mãi từ API

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
      fetchPromotions(); // Gọi API để lấy danh sách khuyến mãi
    }
  }, [isLoggedIn]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await getCartsAPI();

      if (response.isSuccess && response.result.data.length > 0) {
        const cart = response.result.data[response.result.data.length - 1];
        setCartItems(cart.cartItems);
        calculateCartSummary(cart.cartItems);
      } else {
        notification.info({ message: 'Info', description: 'No cart found.' });
      }
    } catch (error: any) {
      notification.error({ message: 'Error', description: 'Failed to fetch cart items.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      const promotionsData = await getPromotionsAPI();
      setPromotions(promotionsData); // Lưu danh sách khuyến mãi vào state
    } catch (error: any) {
      notification.error({ message: 'Error', description: error.message });
    }
  };
  
  

  const calculateCartSummary = (cartItems: CartItemType[]) => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      totalPrice += item.product?.price || item.batch.price;
      totalDiscount += item.discount || 0;
    });

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setPricePaid(totalPrice - totalDiscount);
  };

  const handleApplyVoucher = async (voucherCode: string) => {
    if (!voucherCode.trim()) {
      notification.warning({ message: 'Warning', description: 'Please enter a valid voucher code.' });
      return;
    }
  
    // Tìm mã khuyến mãi từ danh sách
    const promotion = promotions.find((promo) => promo.discountCode.toUpperCase() === voucherCode.toUpperCase());
  
    if (!promotion) {
      notification.error({ message: 'Error', description: 'Invalid voucher code.' });
      return;
    }
  
    // Gọi API để lấy chi tiết mã khuyến mãi
    try {
      const response = await getPromotionDetailsAPI(promotion.id); // Gọi API với ID
  
      const discountAmount = (price * response.discountPercentage) / 100;
      setDiscount(discountAmount);
      setPricePaid(price - discountAmount);
  
      notification.success({ message: 'Success', description: 'Voucher applied successfully!' });
    } catch (error: any) {
      notification.error({ message: 'Error', description: 'Failed to apply voucher.' });
    }
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

  const removeItem = async (itemId: string) => {
    await removeProductFromCart(user.cartId, itemId);
    fetchCartItems();
  };

  const handlePay = async () => {
    const res = await payOrder(user.cartId);
    window.location.href = res.result.data.paymentUrl;
    fetchCartItems();
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
                <p>Please sign in to view your cart.</p>
              ) : cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
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
                      onApplyVoucher={handleApplyVoucher} // Truyền hàm áp dụng mã khuyến mãi
                    />
                  </div>
                </div>
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
