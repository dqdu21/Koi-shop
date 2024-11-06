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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  origin: string;
  age: number;
  weight: number;
  length: number;
  species: string;
  color: string;
  feedingVolumn: string;
  filterRate: number;
  gender: string;
  inventory: number;
  isForSell: boolean;
  categoryId: string;
}

interface Credential {
  name: string;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { productID } = useParams<{ productID: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { collapsed } = useSider();
  const [credential, setCredential] = useState<Credential | null>(null);
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `https://koifarmshop.online/api/product/${productID}`
        );
        setProduct(response.data.result.data);

        // Fetch product image
        const imageResponse = await axiosInstance.get(
          `https://koifarmshop.online/api/media/product/${productID}`
        );
        setImageURL(imageResponse.data.result.data.imageUrl);

        const credentialResponse = await axiosInstance.get(
          `https://koifarmshop.online/api/credential/product/${productID}`
        );
        setCredential(credentialResponse.data.result.data);
      } catch (error) {}
    };

    if (productID) {
      fetchProduct();
    }
  }, [productID]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && product && quantity < product.inventory) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };


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
        `https://koifarmshop.online/api/cart/${cartId}/product/add`,
        {
          productId: product?.id, // Adjust based on API requirements
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      notification.success({
        message: "Success",
        description: "Product added to cart.",
      });
    } catch (error) {
      // Log the full error object to the console for debugging
      console.error("Error adding to cart:", error);
      notification.error({
        message: "Error",
        description: "Could not add product to cart.",
      });
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading Product Details...
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
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={
                    imageURL ||
                    "https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"
                  }
                  alt={product.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {product.name}
                  </h1>
                  <div className="flex items-center text-yellow-500">
                    <StarFilled className="mr-1" />
                    <span className="text-sm text-gray-600">(4.5)</span>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <span className="text-3xl font-semibold text-red-600 mr-4">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inventory > 0 ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                      In Stock: {product.inventory}
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
                      Out of Stock
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Product Specifications */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-lg">
                  <div>
                    <strong className="text-gray-700">Species:</strong>{" "}
                    {product.species}
                    <br />
                    <strong className="text-gray-700">Origin:</strong>{" "}
                    {product.origin}
                    <br />
                    <strong className="text-gray-700">Color:</strong>{" "}
                    {product.color}
                    <br />
                    <strong className="text-gray-700">
                      Feeding Volume:
                    </strong>{" "}
                    {product.feedingVolumn}
                  </div>
                  <div>
                    <strong className="text-gray-700">Age:</strong>{" "}
                    {product.age} months
                    <br />
                    <strong className="text-gray-700">Length:</strong>{" "}
                    {product.length} cm
                    <br />
                    <strong className="text-gray-700">Weight:</strong>{" "}
                    {product.weight} g
                    <br />
                    <strong className="text-gray-700">Gender:</strong>{" "}
                    {product.gender}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-t border-b text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-300 transition"
                    disabled={product.inventory === 0}
                  >
                    +
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                    disabled={product.inventory === 0}
                  >
                    <ShoppingCartOutlined className="mr-2" />
                    Add to Cart
                  </button>
                  <button className="bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition">
                    <HeartOutlined />
                  </button>
                </div>

                {/* Credential Information */}
                {credential && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Credential
                    </h3>
                    <p>
                      <strong>Name:</strong> {credential.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {credential.description}
                    </p>
                  </div>
                )}
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

export default ProductDetail;
