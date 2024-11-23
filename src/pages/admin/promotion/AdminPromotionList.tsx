import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification, Space, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getPromotionsAPI, deletePromotionAPI, startPromotionAPI } from '@/services/promotionService';
import { formatDate } from '@/utils/dateUtils';
import AdminHeader from "../header/AdminHeader"; // Header của Admin
import AdminSidebar from "../siderbar/AdminSiderbar"; // Sidebar của Admin

const { Content } = Layout;

const AdminPromotionList: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await getPromotionsAPI();
      const promotionsData = response?.data || [];
      setPromotions(promotionsData);
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to fetch promotions.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartPromotion = async (promotionId: string) => {
    try {
      await startPromotionAPI(promotionId);
      notification.success({
        message: 'Success',
        description: 'Promotion started successfully!',
      });
      fetchPromotions();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to start promotion.',
      });
    }
  };

  const handleDelete = async (promotionId: string) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This will delete the promotion permanently.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deletePromotionAPI(promotionId);
          notification.success({
            message: 'Success',
            description: 'Promotion deleted successfully!',
          });
          fetchPromotions();
        } catch (error: any) {
          notification.error({
            message: 'Error',
            description: error.message || 'Failed to delete promotion.',
          });
        }
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Discount Code',
      dataIndex: 'discountCode',
      key: 'discountCode',
    },
    {
      title: 'Discount Percentage',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (value: number) => `${value}%`,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value: string) => formatDate(value),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate(`/admin/promotion/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => handleStartPromotion(record.id)}
            disabled={record.isActive}
          >
            Start
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebar />

      <Layout>
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Admin - Promotion List</h2>
            <Table
              dataSource={promotions}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPromotionList;
