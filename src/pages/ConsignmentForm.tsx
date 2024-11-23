import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, message, Select, Switch } from "antd";
import useRefreshData from "../components/hooks/useRefreshData";
import { ConsignmentOnline, ConsignmentOffline } from "../models/consignment";
import useAddConsignment from "../components/hooks/consignment/useAddConsignment";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const ConsignmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const [consignmentType, setConsignmentType] = useState<"online" | "offline">("online");
  const navigate = useNavigate();

  const refreshData = async () => {
    message.info("Data refreshed");
  };
  const { refresh, loading: refreshing } = useRefreshData(refreshData);

  const { addConsignment, loading } = useAddConsignment(async () => {
    form.resetFields();
    refresh();
    message.success("Consignment request submitted successfully!");
    navigate("/consignment-list");
  });

  const handleSubmit = async (values: ConsignmentOnline | ConsignmentOffline) => {
    const isOnline = consignmentType === "online";
    await addConsignment(values, isOnline); // Đảm bảo gọi API hoàn tất trước khi chuyển trang
  };

  return (
    <MainLayout>
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 600, margin: "auto" }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
          Register Koi Fish Consignment
        </h2>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ consignmentType, quantity: 1, commissionPercentage: 0 }}
        >
          {/* Select Consignment Type */}
          <Form.Item
            label="Consignment Type"
            name="consignmentType"
            rules={[{ required: true, message: "Please select a consignment type" }]}
          >
            <Radio.Group
              onChange={(e) => {
                setConsignmentType(e.target.value);
                form.resetFields(); // Xóa dữ liệu cũ khi chuyển loại
                form.setFieldsValue({ consignmentType: e.target.value });
              }}
            >
              <Radio.Button value="online">Online</Radio.Button>
              <Radio.Button value="offline">Offline</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/* Shared Fields */}
          <Form.Item
            label="Available for Sale?"
            name="isForSell"
            valuePropName="checked"
            initialValue={true}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Product name is required" },
              { max: 50, message: "Product name cannot exceed 50 characters" },
            ]}
          >
            <Input placeholder="e.g. Showa" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description is required" },
              { min: 10, message: "Description must be at least 10 characters" },
              { max: 200, message: "Description cannot exceed 200 characters" },
            ]}
          >
            <Input.TextArea placeholder="Product description" rows={3} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Quantity is required" },
              { type: "number", min: 1, max: 100, message: "Quantity must be between 1 and 100" },
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} placeholder="e.g. 1" />
          </Form.Item>
          <Form.Item
            label="Commission Rate (%)"
            name="commissionPercentage"
            rules={[
              { required: true, message: "Commission rate is required" },
              { type: "number", min: 0, max: 100, message: "Commission rate must be between 0 and 100" },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
          </Form.Item>
          <Form.Item
            label="Transaction Amount"
            name="dealingAmount"
            rules={[
              { required: true, message: "Transaction amount is required" },
              { type: "number", min: 20000, message: "Transaction amount must be at least 20000 VND" },
            ]}
          >
            <InputNumber min={20000} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
          </Form.Item>
          <Form.Item
            label="Consignment Fee"
            name="consignmentFee"
            rules={[
              { required: true, message: "Consignment fee is required" },
              { type: "number", min: 0, message: "Consignment fee must be a positive value" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
          </Form.Item>

          {/* Shared Fields for Online and Offline */}
          <Form.Item
            label="Origin"
            name="origin"
            rules={[{ required: true, message: "Origin is required" }]}
          >
            <Input placeholder="e.g. Japan" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Age is required" },
              { type: "number", min: 0, max: 30, message: "Age must be between 0 and 30" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 2" />
          </Form.Item>
          <Form.Item
            label="Length (cm)"
            name="length"
            rules={[
              { required: true, message: "Length is required" },
              { type: "number", min: 0, max: 200, message: "Length must be between 0 and 200 cm" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 30" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select product category">
              <Select.Option key="9ec7a331-9530-4a9a-a1b4-08dd09100122" value="9ec7a331-9530-4a9a-a1b4-08dd09100122">Goshiki</Select.Option>
              <Select.Option key="079fb7bd-d7c4-4e73-a1b5-08dd09100122" value="079fb7bd-d7c4-4e73-a1b5-08dd09100122">Kujyaku</Select.Option>
              <Select.Option key="1df04aba-ff09-4537-a1b6-08dd09100122" value="1df04aba-ff09-4537-a1b6-08dd09100122">Asagi</Select.Option>
              <Select.Option key="ae3de438-c167-42e5-a1b7-08dd09100122" value="ae3de438-c167-42e5-a1b7-08dd09100122">Tancho</Select.Option>
              <Select.Option key="f1a9083d-9e54-4a9a-a1b8-08dd09100122" value="f1a9083d-9e54-4a9a-a1b8-08dd09100122">Butterfly / Hirenaga</Select.Option>
              <Select.Option key="95999012-8f59-4a32-a1b9-08dd09100122" value="95999012-8f59-4a32-a1b9-08dd09100122">Ginrin</Select.Option>
              <Select.Option key="3d4fc185-049d-4a96-851b-1d320e7dbba8" value="3d4fc185-049d-4a96-851b-1d320e7dbba8">Kohaku</Select.Option>
              <Select.Option key="5f18bf0c-7199-462c-b023-3ccf1fd9f806" value="5f18bf0c-7199-462c-b023-3ccf1fd9f806">Showa</Select.Option>
              <Select.Option key="9a17dcf5-1426-45ee-a32e-c23ee5fe40d9" value="9a17dcf5-1426-45ee-a32e-c23ee5fe40d9">Shiro Utsuri</Select.Option>
            </Select>
          </Form.Item>

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
              Submit Consignment Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ConsignmentForm;
