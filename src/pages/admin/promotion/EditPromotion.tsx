import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Button, Spin, notification } from 'antd';
import { getPromotionDetailsAPI, updatePromotionAPI } from '@/services/promotionService';

const EditPromotion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      console.log("Editing promotion with ID:", id); // Debug ID
      fetchPromotionDetails(id);
    }
  }, [id]);

  const fetchPromotionDetails = async (promotionId: string) => {
    setLoading(true);
    try {
      const response = await getPromotionDetailsAPI(promotionId);
      console.log("Promotion Details:", response); // Debug API response
      form.setFieldsValue({
        name: response.name || "",
        description: response.description || "",
        discountCode: response.discountCode || "",
        discountPercentage: response.discountPercentage || 0,
        dateRange: [
          response.startDate ? new Date(response.startDate) : null,
          response.endDate ? new Date(response.endDate) : null,
        ],
      });
    } catch (error: any) {
      console.error("Error fetching promotion details:", error);
      notification.error({ message: 'Error', description: error.message || 'Failed to fetch promotion details.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: any) => {
    const updatedPromotion = {
      name: values.name,
      description: values.description,
      discountCode: values.discountCode,
      discountPercentage: values.discountPercentage,
      startDate: values.dateRange[0]?.toISOString(),
      endDate: values.dateRange[1]?.toISOString(),
    };

    try {
      await updatePromotionAPI(id!, updatedPromotion); // Gửi dữ liệu cập nhật
      notification.success({ message: 'Success', description: 'Promotion updated successfully!' });
      navigate('/admin/promotion'); // Quay lại danh sách
    } catch (error: any) {
      console.error("Error updating promotion:", error);
      notification.error({ message: 'Error', description: error.message || 'Failed to update promotion.' });
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Promotion</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Promotion Name"
          name="name"
          rules={[{ required: true, message: 'Please enter promotion name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter promotion description.' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Discount Code"
          name="discountCode"
          rules={[{ required: true, message: 'Please enter discount code.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Discount Percentage"
          name="discountPercentage"
          rules={[
            { required: true, message: 'Please enter discount percentage.' },
            { type: 'number', min: 1, max: 100, message: 'Percentage must be between 1 and 100.' },
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: 'Please select date range.' }]}
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Promotion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPromotion;
