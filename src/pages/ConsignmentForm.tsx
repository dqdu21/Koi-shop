import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, DatePicker, message, Select } from "antd";
import useRefreshData from "../components/hooks/useRefreshData";
import { ConsignmentOnline, ConsignmentOffline } from "../models/consignment";
import useAddConsignment from "../components/hooks/consignment/useAddConsignment";
import { useNavigate } from "react-router-dom";

const ConsignmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const [consignmentType, setConsignmentType] = useState<"online" | "offline">("online");
  const navigate = useNavigate();

  // Hook để làm mới dữ liệu sau khi thêm consignment thành công
  const refreshData = async () => {
    message.info("Data refreshed");
  };
  const { refresh, loading: refreshing } = useRefreshData(refreshData);

  // Hook để thêm consignment
  const { addConsignment, loading } = useAddConsignment(() => {
    form.resetFields(); // Xóa form sau khi đăng ký thành công
    refresh(); // Làm mới dữ liệu
    message.success("Đăng ký ký gửi thành công!");
    navigate("/consignments");
  });

  const handleSubmit = (values: ConsignmentOnline | ConsignmentOffline) => {
    const isOnline = consignmentType === "online";
    addConsignment(values, isOnline);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 600, margin: "auto" }}>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
        Đăng Ký Ký Gửi Cá Koi
      </h2>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ color: "#1f2937" }}
      >
        {/* Lựa chọn hình thức ký gửi */}
        <Form.Item label="Hình Thức Ký Gửi" name="consignmentType">
          <Radio.Group
            value={consignmentType}
            onChange={(e) => setConsignmentType(e.target.value)}
          >
            <Radio.Button value="online">Online</Radio.Button>
            <Radio.Button value="offline">Offline</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Form cho Consignment Online */}
        {consignmentType === "online" && (
          <>
            <Form.Item
              label="Mã Đơn Hàng"
              name="orderId"
              rules={[{ required: true, message: "Vui lòng nhập mã đơn hàng" }]}
            >
              <Input placeholder="Nhập mã đơn hàng" />
            </Form.Item>
            <Form.Item
              label="Mã Mục Hàng"
              name="orderItemId"
              rules={[{ required: true, message: "Vui lòng nhập mã mục hàng" }]}
            >
              <Input placeholder="Nhập mã mục hàng" />
            </Form.Item>
            <Form.Item
              label="Tỷ Lệ Hoa Hồng (%)"
              name="commissionPercentage"
              rules={[{ required: true, message: "Vui lòng nhập tỷ lệ hoa hồng" }]}
            >
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Phí Ký Gửi"
              name="consignmentFee"
              rules={[{ required: true, message: "Vui lòng nhập phí ký gửi" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Ngày Hết Hạn Ký Gửi"
              name="expiryDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Số Tiền Giao Dịch"
              name="dealingAmount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền giao dịch" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </>
        )}

        {/* Form cho Consignment Offline */}
        {consignmentType === "offline" && (
          <>
            <Form.Item
              label="Tên Sản Phẩm"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
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
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Tỷ Lệ Hoa Hồng (%)"
              name="commissionPercentage"
              rules={[{ required: true, message: "Vui lòng nhập tỷ lệ hoa hồng" }]}
            >
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Số Tiền Giao Dịch"
              name="dealingAmount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền giao dịch" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Xuất Xứ"
              name="origin"
            >
              <Input placeholder="Nhập xuất xứ" />
            </Form.Item>
            <Form.Item
              label="Tuổi"
              name="age"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Chiều Dài (cm)"
              name="length"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Loài/Loại"
              name="species"
            >
              <Input placeholder="Nhập loài hoặc loại sản phẩm" />
            </Form.Item>
            <Form.Item
              label="Màu Sắc"
              name="color"
            >
              <Input placeholder="Nhập màu sắc" />
            </Form.Item>
            <Form.Item
              label="Lượng Thức Ăn Cần Thiết"
              name="feedingVolume"
            >
              <Input placeholder="Nhập lượng thức ăn cần thiết" />
            </Form.Item>
            <Form.Item
              label="Tần Suất Lọc"
              name="filterRate"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Giới Tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Radio.Group>
                <Radio value={0}>Đực</Radio>
                <Radio value={1}>Cái</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Danh Mục"
              name="categoryId"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select placeholder="Chọn danh mục sản phẩm">
                {/* Thay thế các giá trị dưới đây bằng dữ liệu danh mục thực tế nếu có */}
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
  );
};

export default ConsignmentForm;
