import React from 'react';
import { Layout } from 'antd';
import AdminHeader from '../header/AdminHeader';
import AdminSidebar from '../siderbar/AdminSiderbar';
import AddPromotionForm from '@/components/form/AddPromotionForm';

const { Content } = Layout;

const AdminPromotionPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebar />

      <Layout>
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Admin - Create New Promotion
            </h2>
            <AddPromotionForm />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPromotionPage;
