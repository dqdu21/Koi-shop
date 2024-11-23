import React, { useState } from 'react';
import { Input, Button, Form, DatePicker, InputNumber, notification } from 'antd';
import { createPromotionAPI } from '@/services/promotionService'; 
import { formatDate } from '@/utils/dateUtils'; 

const AddPromotionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { name, description, discountCode, discountPercentage, dateRange } = values;
      const startDate = formatDate(dateRange[0].toISOString()); // Format ngày bắt đầu
      const endDate = formatDate(dateRange[1].toISOString());   // Format ngày kết thúc

      const promotionData = {
        name,
        description,
        discountCode,
        discountPercentage,
        startDate,
        endDate,
      };

      const response = await createPromotionAPI(promotionData);
      if (response.isSuccess) {
        notification.success({
          message: 'Success',
          description: 'Promotion created successfully!',
        });
      } else {
        notification.error({
          message: 'Error',
          description: response.message || 'Failed to create promotion.',
        });
      }
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Promotion Name"
        name="name"
        rules={[{ required: true, message: 'Please enter promotion name.' }]}
      >
        <Input placeholder="Enter promotion name" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter promotion description.' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter promotion description" />
      </Form.Item>
      <Form.Item
        label="Discount Code"
        name="discountCode"
        rules={[{ required: true, message: 'Please enter discount code.' }]}
      >
        <Input placeholder="Enter discount code" />
      </Form.Item>
      <Form.Item
        label="Discount Percentage"
        name="discountPercentage"
        rules={[
          { required: true, message: 'Please enter discount percentage.' },
          { type: 'number', min: 1, max: 100, message: 'Percentage must be between 1 and 100.' },
        ]}
      >
        <InputNumber placeholder="Enter discount percentage" className="w-full" />
      </Form.Item>
      <Form.Item
        label="Date Range"
        name="dateRange"
        rules={[{ required: true, message: 'Please select start and end date.' }]}
      >
        <DatePicker.RangePicker className="w-full" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Promotion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPromotionForm;
