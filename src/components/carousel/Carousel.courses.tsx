// CarouselCourse.tsx
import React from 'react';
import { Carousel } from 'antd';
import { CourseCard } from './CourseCard';// Sử dụng CourseCard để hiển thị sản phẩm

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  gender: string;
  inventory: number;
}

interface CarouselCourseProps {
  products: Product[];  // Nhận danh sách sản phẩm qua props
}

const CarouselCourse: React.FC<CarouselCourseProps> = ({ products }) => {
  return (
    <Carousel autoplay>
      {products.map((product) => (
        <div key={product.id} className="p-4">
          <CourseCard product={product} /> {/* Hiển thị mỗi sản phẩm */}
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselCourse;
