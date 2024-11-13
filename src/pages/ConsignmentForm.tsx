import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, DatePicker, message, Select, Switch } from "antd";
import useRefreshData from "../components/hooks/useRefreshData";
import { ConsignmentOnline, ConsignmentOffline } from "../models/consignment";
import useAddConsignment from "../components/hooks/consignment/useAddConsignment";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout"; // Import MainLayout

const ConsignmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const [consignmentType, setConsignmentType] = useState<"online" | "offline">("online");
  const navigate = useNavigate();

  const refreshData = async () => {
    message.info("Data refreshed");
  };
  const { refresh, loading: refreshing } = useRefreshData(refreshData);

  const { addConsignment, loading } = useAddConsignment(() => {
    form.resetFields();
    refresh();
    message.success("Đăng ký ký gửi thành công!");
    navigate("/consignment-list");
  });

  const handleSubmit = (values: ConsignmentOnline | ConsignmentOffline) => {
    const isOnline = consignmentType === "online";
    addConsignment(values, isOnline);
  };

  return (
    <MainLayout> 
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 600, margin: "auto" }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
          Đăng Ký Ký Gửi Cá Koi
        </h2>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Lựa chọn hình thức ký gửi */}
          <Form.Item label="Hình Thức Ký Gửi" name="consignmentType">
            <Radio.Group value={consignmentType} onChange={(e) => setConsignmentType(e.target.value)}>
              <Radio.Button value="online">Online</Radio.Button>
              <Radio.Button value="offline">Offline</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Có để bán không?"
            name="isForSell"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>

          {/* Form cho Consignment Online */}
          {consignmentType === "online" && (
            <>
              <Form.Item
                label="Mã Đơn Hàng"
                name="orderId"
                rules={[{ required: true, message: "Vui lòng nhập mã đơn hàng" }]}
              >
                <Input placeholder="e.g. CA123456789US" />
              </Form.Item>
              <Form.Item
                label="Mã Mục Hàng"
                name="orderItemId"
                rules={[{ required: true, message: "Vui lòng nhập mã mục hàng" }]}
              >
                <Input placeholder="e.g. ITEM123456" />
              </Form.Item>
              <Form.Item
                label="Tỷ Lệ Hoa Hồng (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: "e.g. 15" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
              </Form.Item>
              <Form.Item
                label="Phí Ký Gửi"
                name="consignmentFee"
                rules={[{ required: true, message: "e.g. 100000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 100000" />
              </Form.Item>
              <Form.Item
                label="Ngày Hết Hạn Ký Gửi"
                name="expiryDate"
                rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày hết hạn" />
              </Form.Item>
              <Form.Item
                label="Số Tiền Giao Dịch"
                name="dealingAmount"
                rules={[{ required: true, message: "e.g. 150000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
              </Form.Item>
            </>
          )}

          {/* Form cho Consignment Offline */}
          {consignmentType === "offline" && (
            <>
              <Form.Item
                label="Tên Sản Phẩm"
                name="name"
                rules={[{ required: true, message: "e.g. Showa" }]}
              >
                <Input placeholder="e.g. Showa" />
              </Form.Item>
              <Form.Item
                label="Mô Tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea placeholder="Mô tả sản phẩm" rows={3} />
              </Form.Item>
              <Form.Item
                label="Số Lượng"
                name="quantity"
                rules={[{ required: true, message: "e.g. 1" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} placeholder="e.g. 1" />
              </Form.Item>
              <Form.Item
                label="Tỷ Lệ Hoa Hồng (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: "e.g. 15" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
              </Form.Item>
              <Form.Item
                label="Số Tiền Giao Dịch"
                name="dealingAmount"
                rules={[{ required: true, message: "e.g. 150000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
              </Form.Item>
              <Form.Item label="Xuất Xứ" name="origin">
                <Input placeholder="e.g. Japan" />
              </Form.Item>
              <Form.Item label="Tuổi" name="age">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 2" />
              </Form.Item>
              <Form.Item label="Chiều Dài (cm)" name="length">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 30" />
              </Form.Item>
              <Form.Item label="Loài/Loại" name="species">
                <Input placeholder="e.g. Kohaku" />
              </Form.Item>
              <Form.Item label="Màu Sắc" name="color">
                <Input placeholder="e.g. Red and White" />
              </Form.Item>
              <Form.Item label="Lượng Thức Ăn Cần Thiết" name="feedingVolume">
                <Input placeholder="e.g. 200g per day" />
              </Form.Item>
              <Form.Item label="Tần Suất Lọc" name="filterRate">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 80" />
              </Form.Item>
              <Form.Item
                label="Giới Tính"
                name="gender"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Radio.Group>
                  <Radio value="male">Đực</Radio>
                  <Radio value="female">Cái</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Danh Mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục sản phẩm">
                  <Select.Option value="3D4FC185-049D-4A96-851B-1D320E7DBBA8">Lai F1</Select.Option>
                  <Select.Option value="5F18BF0C-7199-462C-B023-3CCF1FD9F806">Thuần chủng nhập khẩu</Select.Option>
                  <Select.Option value="9A17DCF5-1426-45EE-A32E-C23EE5FE40D9">Thuần Việt</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || refreshing}
              style={{
                backgroundColor: "#b91c1c",
                borderColor: "#b91c1c",
                width: "100%",
                fontWeight: "bold",
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
