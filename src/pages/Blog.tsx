import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const categories = [
  { name: 'Customer Stories', path: '/customer-stories' },
  { name: 'Taro’s Tips', path: '/taros-tips' },
  { name: 'Koi Health', path: '/koi-health' },
  { name: 'News', path: '/news' },
  { name: 'Koi Talk', path: '/koi-talk' },
  { name: 'All Posts', path: '/all-posts' }
];

const posts = [
  {
    title: 'Customer Story: John S. – Tranquility of Admiring Koi',
    date: 'Jul 31, 2024',
    description: 'Meet John, a 30 Year Koi and Exotic Aquatics Veteran...',
    image: 'image_url_1',
    link: '/customer-story-john-s'
  },
  {
    title: 'Customer Story: Elliot V. – A Journey With A New Hobbyist',
    date: 'Sep 3, 2023',
    description: 'Enjoy This Customer Story About Elliot, A New Koi Hobbyist...',
    image: 'image_url_2',
    link: '/customer-story-elliot-v'
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
    <div className="p-8 bg-gray-50">
      {/* Header Navigation */}
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            type="primary"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            onClick={() => navigate(category.path)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Blog Posts */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">Read Customer Story Posts:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card
              key={post.title}
              hoverable
              cover={<img alt={post.title} src={post.image} />}
              onClick={() => navigate(post.link)}
              className="rounded-lg shadow-md"
            >
              <Card.Meta
                title={<h3 className="text-xl font-semibold">{post.title}</h3>}
                description={
                  <div>
                    <p className="text-gray-500 mb-2">{post.date}</p>
                    <p>{post.description}</p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default Blog;
