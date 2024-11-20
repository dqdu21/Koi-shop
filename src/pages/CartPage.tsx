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
import { getAddressOwn } from '@/services/addressService';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [pricePaid, setPricePaid] = useState(0);
  const { collapsed } = useSider();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { isLoggedIn } = useAuth();
  const { user} = useAuth()
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
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

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCartItems();
  }, []);



  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems((prev) => {
      const updatedSelectedItems = new Set(prev);
      if (selected) {
        updatedSelectedItems.add(id); // Add to selected items
      } else {
        updatedSelectedItems.delete(id); // Remove from selected items
      }
      return updatedSelectedItems;
    });
  };

  const calculateCartSummary = (cartItems: CartItemType[]) => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      totalPrice = (item.product ? item.product.price : item.batch.price) + totalPrice; // Adjust based on your item structure
      // Assuming each cart item has a discount property
      totalDiscount += item.discount || 0;
    });

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setPricePaid(totalPrice - totalDiscount);
  };

  const removeItem = async (itemId: string) => {
      await removeProductFromCart(user.cartId,itemId);
      fetchCartItems()
  }

  const handlePay = async ()  => {

    const res = await payOrder(user.cartId);
    window.location.href = res.result.data.paymentUrl
    fetchCartItems()
  }
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

                      <div className='grid grid-cols-[2fr_1fr] gap-4'>
                        <div className="">
                        {cartItems.map((item) => ( <CartItem
                        key={item.id}
                        item={item}
                        onRemove={removeItem} // Ensure you implement this
                        isSelected={selectedItems.has(item.id)} // Ensure selectedItems is defined
                        onSelect={handleSelect} // Ensure you implement this
                      />  ))}
                        </div>

                      <CartSummary
                    price_paid={pricePaid}
                    price={price}
                    discount={discount}
                    cartItems={cartItems} // Ensure CartSummary can handle this prop
                    selectedItems={selectedItems} // Ensure selectedItems is defined
                     // Ensure you implement this
                    onSelect={handleSelect} // Ensure you implement this
                    onPay={() => handlePay()}
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
