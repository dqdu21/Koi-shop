import { Layout, notification } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import Achievements from '../components/surface/Achievements';
import CarouselInstructor from '../components/carousel/Carousel.instructor';
import CarouselReview from '../components/carousel/Carousel.review';
import ImageSlider from "../components/surface/ImageSlider";
import slider_1 from "../assets/Images/slider1.png";
import slider_2 from "../assets/Images/slider2.png";
import slider_3 from "../assets/Images/slider3.png";
import { axiosInstance } from '../services/axiosInstance';
import { useEffect, useState } from 'react';
import Information from './Information';
import { addToCartAPI } from '../services/cartService';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  origin: string;
  age: number;
  length: number;
  species: string;
  color: string;
  feedingVolumn: string;
  filterRate: string;
  gender: string;
  inventory: number;
  isForSell: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

const HomePage: React.FC = () => {
  const slides = [
    { url: slider_1, title: "slider_1" },
    { url: slider_2, title: "slider_2" },
    { url: slider_3, title: "slider_3" },
  ];

  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "400px",
    margin: "0 auto",
  };

  const { collapsed } = useSider();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('https://koifarmshop.online/api/category');
        setCategories(response.data.result.data);  // assuming response.data.result.data contains the array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      const cartId = '26f157fd-80a2-48e5-3948-08dcf8697f41'; // Use the actual cart ID
      const response = await axiosInstance.post(
        `https://koifarmshop.online/api/cart/${cartId}/product/add`,
        {
          productId: product.id, // Adjust based on API requirements
        },
        {
          headers: {
            'Content-Type': 'application/json', // Ensure proper content type
          },
        }
      );
      notification.success({ message: 'Success', description: 'Product added to cart.' });
    } catch (error) {
      // Log the full error object to the console for debugging
      console.error('Error adding to cart:', error);
    notification.error({ message: 'Error', description: 'Could not add product to cart.' });
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
            <div className="image-slider-container" style={containerStyles}>
              <ImageSlider slides={slides} />
            </div>
            <Information />
            <div className="p-8">
              {categories.map(category => (
                <section key={category.id} className="mt-10">
                  <div className="w-full flex justify-between mb-5">
                    <h1 className="font-bold text-xl">{category.name}</h1>
                    <a href="#" className="hover:text-amber-600 font-light">See all</a>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {category.products.map(product => (
                      <article key={product.id} className="rounded-md bg-slate-200 drop-shadow-md p-4">
                        <img
                          src="https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg" // Use product image when available
                          alt={product.name}
                        />
                        <div className="flex justify-between my-3">
                          <span>{product.inventory} in stock</span>
                          <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
                        </div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs">
                            By <span className="font-medium">Koi Farm</span>
                          </p>
                          <button onClick={() => handleAddToCart(product)} className="bg-amber-500 text-white py-1 px-3 rounded">
                            Add to Cart
                          </button>
                          <span>${product.price}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
              <Achievements />
              <section>
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Chủ shop</h1>
                  <a href="#" className="hover:text-amber-600 font-light">See all</a>
                </div>
                <CarouselInstructor />
              </section>
              <section className="my-10">
                <h1 className="font-bold text-xl mb-5">Phản hồi của khách hàng</h1>
                <CarouselReview />
              </section>
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

export default HomePage;
