import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import Achievements from '../components/surface/Achievements';
import CarouselInstructor from '../components/carousel/Carousel.instructor';
import CarouselReview from '../components/carousel/Carousel.review';
import CarouselCourse from '../components/carousel/Carousel.courses';
import ImageSlider from "../components/surface/ImageSlider";
import slider_1 from "../assets/Images/slider1.png";
import slider_2 from "../assets/Images/slider2.png";
import slider_3 from "../assets/Images/slider3.png";
import { axiosInstance } from '../services/axiosInstance';
import { useEffect, useState } from 'react';

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

const CourseCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className="rounded-md bg-slate-200 drop-shadow-md w-full cursor-pointer hover:-translate-y-2 transition ease-out hover:delay-75 hover:shadow-md">
      <div className="p-4">
        <div>
          <img
            src="https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"
            alt={product.name}
          />
        </div>
        <div className="flex justify-between my-3">
          <div>
            <span>{product.inventory} in stock</span>
          </div>
          <div>
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
          </div>
        </div>
        <h3 className="font-semibold">{product.name}</h3>
        <div className="my-2">
          <span className="font-light text-xs">{product.gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">
            By <span className="font-medium">Koi Farm</span>
          </p>
          <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
          <span>${product.price}</span>
        </div>
      </div>
    </article>
  );
};


const HomePage: React.FC = () => {

  const slides = [
    {
      url: slider_1,
      title: "slider_1",
    },
    {
      url: slider_2,
      title: "slider_2",
    },
    {
      url: slider_3,
      title: "slider_3",
    },
  ];
  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "400px",
    margin: "0 auto",
  };

  const { collapsed } = useSider();

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('https://koifarmshop.online/api/products/all');
        setProducts(response.data);  // assuming response.data contains the array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


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
      <div className="p-8">
            <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Origin Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Origin of Koi Fish</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Explore more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              When it comes to koi fish or koi carp, people will immediately think of Japan. This fish is known as the national fish of the land of the rising sun. According to some scientific documents, koi fish appeared in the 1820s in Ojiya town, Niigata province, Japan.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-nhat-ban-01-san-vuon-a-dong-768x491.jpg" 
              alt="Origin of Koi Fish" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Characteristics</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Learn more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Basically, koi fish are closely related to goldfish. Currently, koi fish have been bred with hundreds of different species. However, there are about 24 recorded breeds, each with different identification characteristics and colors.
            </p>
            <ul className="space-y-2">
              {[
                "Average lifespan is 25 – 35 years. In favorable environments, koi fish can live up to several hundred years.",
                "Koi fish develop continuously, with growth rates of 50 – 150mm per year depending on the breed.",
                "Adult koi fish can reach a maximum length of 1 meter.",
                "Sex is distinguishable by body shape: males have long bodies, while females have plumper bodies, especially when pregnant.",
                "Female koi fish can lay from 150,000 to 200,000 eggs per litter, starting after about 1 year of raising."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-dep-co-than-hinh-can-doi-04-san-vuon-a-dong.jpg" 
              alt="Koi Fish Characteristics" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Techniques</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 relative h-[350px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/khong-nen-nuoi-ca-koi-voi-mat-do-qua-day-06-san-vuon-a-dong.jpg" 
              alt="Koi Fish Techniques" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Choosing koi breeds: A healthy koi breed will determine 50% of the survival rate and stable development later. You should buy fish from reputable establishments with clear species and origin certificates.
            </p>
            <h3 className="font-semibold text-xl mb-3 text-gray-800">The Japanese koi breed you choose should have:</h3>
            <ul className="space-y-2 mb-4">
              {[
                "A balanced, smooth, elongated body.",
                "A thick mouth, long and hard beard, and harmonious fins.",
                "Bright colors with clear separation between patterns.",
                "Straight, strong swimming with quick reactions."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed text-lg italic">
              Avoid buying koi with deformities, dull colors, or slow movement, as these indicate poor health or disease.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
            <div className="p-8">
            <div className="p-8">
              <section>
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Kohaku</h1>
                  <a href="#" className="hover:text-amber-600 font-light">See all</a>
                </div>
                {/* Truyền products vào CarouselCourse */}
                <CarouselCourse products={products} />
              </section>

              <section className="mt-10">
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Karashi</h1>
                  <a href="#" className="hover:text-amber-600 font-light">See all</a>
                </div>
                <CarouselCourse products={products} />
              </section>

              <section className="mt-10">
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Sowa</h1>
                  <a href="#" className="hover:text-amber-600 font-light">See all</a>
                </div>
                <CarouselCourse products={products} />
              </section>
            </div>
              <Achievements />
              <section>
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Chủ shop</h1>
                  <a href="#" className="hover:text-amber-600 font-light">
                    See all
                  </a>
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
