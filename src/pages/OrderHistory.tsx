import { Layout } from "antd";
import AppHeader from "../components/layout/AppHeader";
import AppFooter from "../components/layout/AppFooter";
import AppSider from "../components/layout/AppSider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../app/context/SiderProvider";
import { getOrderHistory } from "@/services/orderService";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const navigate = useNavigate();

  const { collapsed } = useSider();

  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const res = await getOrderHistory();
    setOrders(res);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout className="h-screen w-screen flex flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={220}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-col flex-1">
          <Content className="flex-1 overflow-auto p-6">
            <div className="min-h-[70vh]">
              <h1 className="text-[2em] font-black">Order History</h1>
              <div className="space-y-8 py-8">
                {orders.map((order: any) => (
                  <Card className="p-8">
                    <div className="flex flex-row gap-2 items-center">
                      <h1 className="font-semibold text-[1.2em]">
                        #{order.id}
                      </h1>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <h1 className="font-semibold text-[1.2em]">Price:</h1>
                      <p>{order.totalPrice.toLocaleString("vi-vn")}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <h1 className="font-semibold text-[1.2em]">
                        Payment Method:
                      </h1>
                      <p>VNPAY</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <h1 className="font-semibold text-[1.2em]">Date:</h1>
                      <p>{format(order.createdAt, "dd/MM/yyyy")}</p>
                    </div>
                    <h1 className="font-semibold text-[1.2em]">Products:</h1>
                    {order.orderItems.map((item: any) => (
                      <Card
                        className="cursor-pointer px-8 py-4 my-2 grid grid-cols-[1fr_4fr_1fr] gap-2 bg-[#333333] text-white"
                        onClick={() => navigate(`/product/${item.productId}`)}
                      >
                        <img
                          src={`https://koifarmshop.site/api/media/product/${item.productId}`} // Fetches image based on product ID
                          className="w-32 h-auto rounded-md" // Optional: style for image
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"; // Fallback image if loading fails
                          }}
                        />
                        <div className="">
                          <h2 className="font-semibold">{item.product.name}</h2>
                          <p>Quantity: {item.quantity}</p>
                          <p>
                            Total:{" "}
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("vi-vn")}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </Card>
                ))}
              </div>
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
