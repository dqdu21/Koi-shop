import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";
import { notification } from "antd";
import { Layout } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";



import AppHeader from "../components/layout/AppHeader";
import AppFooter from "../components/layout/AppFooter";
import AppSider from "../components/layout/AppSider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../app/context/SiderProvider";
import { createCartAPI } from "@/services/cartService";
import { useAuth } from "../routes/AuthContext";
import { getBatch } from "@/services/batchService";
import { Card } from "@/components/ui/card";

interface Batch {
  id: string;
  name: string;
  description: string;
  price: number;
  products: []

}

interface Credential {
  name: string;
  description: string;
}

const BatchDetail: React.FC = () => {
  const { batchID } = useParams<{ batchID: string }>();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { collapsed } = useSider();
  const [credential, setCredential] = useState<Credential | null>(null);
  const { user } = useAuth()
  console.log('check: ',batchID)
  const fetchBatch = async (batchID: string) => {

    try {
      const res = await getBatch(batchID)
      setBatch(res.result.data)
    } catch (error) {}
  };
  useEffect(() => {

    if (batchID) {
      fetchBatch(batchID);
    }
  }, [batchID]);




  const handleAddToCart = async () => {
    try {
      const cartId = user.cartId ; // Use the actual cart ID
      if (!cartId) {
        await createCartAPI({
          currency: "",
          status: 1
        })
      }
       const response = await axiosInstance.post(
        `https://koifarmshop.site/api/cart/${cartId}/batch/${batch?.id}/add`,
        {

        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      notification.success({
        message: "Success",
        description: "Batch added to cart.",
      });
    } catch (error) {
      // Log the full error object to the console for debugging
      console.error("Error adding to cart:", error);
      notification.error({
        message: "Error",
        description: "Could not add batch to cart.",
      });
    }
  };

  if (!batch)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading Batch Details...
        </div>
      </div>
    );

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
            <div className="max-w-5xl mx-auto gap-8">
              {/* Batch Image */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              </div>

              {/* Batch Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {batch.name}
                  </h1>

                  <div className="flex items-center text-yellow-500">
                    <StarFilled className="mr-1" />
                    <span className="text-sm text-gray-600">(4.5)</span>
                  </div>
                </div>

                <div className="">
                  {
                  batch.products.map((item: any) => (
                      <Card
                        className="cursor-pointer px-8 py-4 my-2 grid grid-cols-[1fr_4fr_1fr] gap-2 bg-[#333333] text-white"

                      >
                        <img
                          src={item.imageUrl } // Fetches image based on product ID
                          className="w-32 h-auto rounded-md" // Optional: style for image
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"; // Fallback image if loading fails
                          }}
                        />
                        <div className="">
                          <h2 className="font-semibold">{item.name}</h2>
                          {/* <p>Quantity: {item.quantity}</p> */}
                          <p>
                            Total:{" "}
                            {(
                              (item.price)
                            ).toLocaleString("vi-vn")}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>

                <div className="mb-4 flex items-center">
                  <span className="text-3xl font-semibold text-red-600 mr-4">
                    ${batch.price.toFixed(2)}
                  </span>


                <p className="text-gray-600 mb-6 flex-grow">
                  {batch.description}
                </p>

                {/* Batch Specifications */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-lg">

                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mb-6">

                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center"

                  >
                    <ShoppingCartOutlined className="mr-2" />
                    Add to Cart
                  </button>
                  <button className="bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition">
                    <HeartOutlined />
                  </button>
                </div>


              </div>
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
};

export default BatchDetail;
