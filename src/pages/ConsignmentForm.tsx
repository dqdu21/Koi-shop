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
    // Xử lý yêu cầu ký gửi dựa trên consignmentType
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
        Đăng Ký Ký Gửi Cá Koi
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ color: '#1f2937' }}
      >
        {/* Lựa chọn hình thức ký gửi */}
        <Form.Item label="Hình Thức Ký Gửi" name="consignmentType">
          <Radio.Group
            onChange={handleConsignmentTypeChange}
            value={consignmentType}
          >
            <Radio.Button value="online">Online</Radio.Button>
            <Radio.Button value="offline">Offline</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Thông tin chi tiết cho Online */}
        {consignmentType === 'online' && (
          <>
            <Form.Item
              label="Mã Đơn Hàng"
              name="orderId"
              rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
            >
              <Input placeholder="Nhập mã đơn hàng" />
            </Form.Item>
            <Form.Item
              label="Mã Mục Hàng"
              name="orderItemId"
              rules={[{ required: true, message: 'Vui lòng nhập mã mục hàng' }]}
            >
              <Input placeholder="Nhập mã mục hàng" />
            </Form.Item>
            <Form.Item
              label="Tỷ Lệ Hoa Hồng (%)"
              name="commissionPercentage"
              rules={[
                { required: true, message: 'Vui lòng nhập tỷ lệ hoa hồng' },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: '100%' }}
                placeholder="Nhập tỷ lệ hoa hồng"
              />
            </Form.Item>
            <Form.Item
              label="Phí Ký Gửi"
              name="consignmentFee"
              rules={[{ required: true, message: 'Vui lòng nhập phí ký gửi' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Nhập phí ký gửi"
              />
            </Form.Item>
            <Form.Item
              label="Ngày Hết Hạn Ký Gửi"
              name="expiryDate"
              rules={[
                { required: true, message: 'Vui lòng chọn ngày hết hạn' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Số Tiền Giao Dịch"
              name="dealingAmount"
              rules={[
                { required: true, message: 'Vui lòng nhập số tiền giao dịch' },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Nhập số tiền giao dịch"
              />
            </Form.Item>
          </>
        )}

        {/* Thông tin chi tiết cho Offline */}
        {consignmentType === 'offline' && (
          <>
            <Form.Item
              label="Tên Sản Phẩm"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên sản phẩm' },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
            <Form.Item label="Mô Tả Sản Phẩm" name="description">
              <Input.TextArea placeholder="Mô tả sản phẩm" rows={3} />
            </Form.Item>
            <Form.Item
              label="Số Lượng"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
            >
              <InputNumber
                min={1}
                style={{ width: '100%' }}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
            <Form.Item
              label="Tỷ Lệ Hoa Hồng (%)"
              name="commissionPercentage"
              rules={[
                { required: true, message: 'Vui lòng nhập tỷ lệ hoa hồng' },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: '100%' }}
                placeholder="Nhập tỷ lệ hoa hồng"
              />
            </Form.Item>
            <Form.Item label="Xuất Xứ" name="origin">
              <Input placeholder="Nhập xuất xứ" />
            </Form.Item>
            <Form.Item label="Tuổi" name="age">
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Nhập tuổi của sản phẩm"
              />
            </Form.Item>
            <Form.Item label="Chiều Dài (cm)" name="length">
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Nhập chiều dài sản phẩm"
              />
            </Form.Item>
            <Form.Item label="Loài/Loại" name="species">
              <Input placeholder="Nhập loài hoặc loại sản phẩm" />
            </Form.Item>
            <Form.Item label="Màu Sắc" name="color">
              <Input placeholder="Nhập màu sắc" />
            </Form.Item>
            <Form.Item label="Lượng Thức Ăn Cần Thiết" name="feedingVolume">
              <Input placeholder="Nhập lượng thức ăn" />
            </Form.Item>
            <Form.Item label="Tần Suất Lọc" name="filterRate">
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Nhập tần suất lọc"
              />
            </Form.Item>
            <Form.Item label="Giới Tính" name="gender">
              <Radio.Group>
                <Radio value={0}>Đực</Radio>
                <Radio value={1}>Cái</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}

        {/* Nút gửi yêu cầu ký gửi */}
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
            Gửi Yêu Cầu Ký Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
    </MainLayout>
  );
};

export default ConsignmentForm;
