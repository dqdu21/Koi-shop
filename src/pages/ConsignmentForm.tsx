import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Radio,
} from 'antd';
import MainLayout from '../components/layout/MainLayout';

const ConsignmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const [consignmentType, setConsignmentType] = useState<'online' | 'offline'>(
    'online'
  );

  const handleConsignmentTypeChange = (e: any) => {
    setConsignmentType(e.target.value);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
    // Handle consignment request based on consignmentType
  };

  return (
    <MainLayout>
      <div
        className="p-8 bg-white rounded-lg shadow-lg"
        style={{ maxWidth: '100%', margin: 'auto' }}
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: '#8B0000', textAlign: 'center' }}
        >
          Register Koi Fish Consignment
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ color: '#1f2937' }}
        >
          {/* Consignment Type Selection */}
          <Form.Item label="Consignment Type" name="consignmentType">
            <Radio.Group
              onChange={handleConsignmentTypeChange}
              value={consignmentType}
            >
              <Radio.Button value="online">Online</Radio.Button>
              <Radio.Button value="offline">Offline</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/* Online Consignment Details */}
          {consignmentType === 'online' && (
            <>
              <Form.Item
                label="Order ID"
                name="orderId"
                rules={[{ required: true, message: 'Please enter the order ID' }]}
              >
                <Input placeholder="Enter order ID" />
              </Form.Item>
              <Form.Item
                label="Order Item ID"
                name="orderItemId"
                rules={[{ required: true, message: 'Please enter the order item ID' }]}
              >
                <Input placeholder="Enter order item ID" />
              </Form.Item>
              <Form.Item
                label="Commission Rate (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: 'Please enter the commission rate' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="Enter commission rate"
                />
              </Form.Item>
              <Form.Item
                label="Consignment Fee"
                name="consignmentFee"
                rules={[{ required: true, message: 'Please enter the consignment fee' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Enter consignment fee"
                />
              </Form.Item>
              <Form.Item
                label="Consignment Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please select the expiry date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Transaction Amount"
                name="dealingAmount"
                rules={[{ required: true, message: 'Please enter the transaction amount' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Enter transaction amount"
                />
              </Form.Item>
            </>
          )}

          {/* Offline Consignment Details */}
          {consignmentType === 'offline' && (
            <>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the product name' }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item label="Product Description" name="description">
                <Input.TextArea placeholder="Enter product description" rows={3} />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity' }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="Enter quantity"
                />
              </Form.Item>
              <Form.Item
                label="Commission Rate (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: 'Please enter the commission rate' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="Enter commission rate"
                />
              </Form.Item>
              <Form.Item label="Origin" name="origin">
                <Input placeholder="Enter origin" />
              </Form.Item>
              <Form.Item label="Age" name="age">
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Enter age of the product"
                />
              </Form.Item>
              <Form.Item label="Length (cm)" name="length">
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Enter product length"
                />
              </Form.Item>
              <Form.Item label="Species/Type" name="species">
                <Input placeholder="Enter species or type of product" />
              </Form.Item>
              <Form.Item label="Color" name="color">
                <Input placeholder="Enter color" />
              </Form.Item>
              <Form.Item label="Required Feeding Volume" name="feedingVolume">
                <Input placeholder="Enter feeding volume" />
              </Form.Item>
              <Form.Item label="Filter Rate" name="filterRate">
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Enter filter rate"
                />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Radio.Group>
                  <Radio value={0}>Male</Radio>
                  <Radio value={1}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          {/* Submit Consignment Request Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#b91c1c',
                borderColor: '#b91c1c',
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              Submit Consignment Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ConsignmentForm;
