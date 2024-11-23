import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Button, notification } from 'antd';
import { getPromotionDetailsAPI } from '@/services/promotionService';

const PromotionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [promotion, setPromotion] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPromotionDetails(id);
    }
  }, [id]);

  const fetchPromotionDetails = async (promotionId: string) => {
    setLoading(true);
    try {
      const response = await getPromotionDetailsAPI(promotionId);
      setPromotion(response);
    } catch (error: any) {
      notification.error({ message: 'Error', description: error.message || 'Failed to fetch promotion details.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Promotion Details</h2>
      {promotion ? (
        <div>
          <p><strong>Name:</strong> {promotion.name}</p>
          <p><strong>Description:</strong> {promotion.description}</p>
          <p><strong>Discount Code:</strong> {promotion.discountCode}</p>
          <p><strong>Discount Percentage:</strong> {promotion.discountPercentage}%</p>
          <p><strong>Start Date:</strong> {promotion.startDate}</p>
          <p><strong>End Date:</strong> {promotion.endDate}</p>
          <p><strong>Status:</strong> {promotion.isActive ? 'Active' : 'Inactive'}</p>
          <Button type="primary" onClick={() => navigate('/admin/promotion-list')}>
            Back to List
          </Button>
        </div>
      ) : (
        <p>No promotion found.</p>
      )}
    </div>
  );
};

export default PromotionDetail;
