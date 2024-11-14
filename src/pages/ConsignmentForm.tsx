import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, DatePicker, message, Select, Switch } from "antd";
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

  const { addConsignment, loading } = useAddConsignment(() => {
    form.resetFields();
    refresh();
    message.success("Consignment request submitted successfully!");
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
          Register Koi Fish Consignment
        </h2>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Select Consignment Type */}
          <Form.Item label="Consignment Type" name="consignmentType">
            <Radio.Group value={consignmentType} onChange={(e) => setConsignmentType(e.target.value)}>
              <Radio.Button value="online">Online</Radio.Button>
              <Radio.Button value="offline">Offline</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Available for Sale?"
            name="isForSell"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          {/* Form for Online Consignment */}
          {consignmentType === "online" && (
            <>
              <Form.Item
                label="Order ID"
                name="orderId"
                rules={[{ required: true, message: "Please enter the order ID" }]}
              >
                <Input placeholder="e.g. CA123456789US" />
              </Form.Item>
              <Form.Item
                label="Order Item ID"
                name="orderItemId"
                rules={[{ required: true, message: "Please enter the order item ID" }]}
              >
                <Input placeholder="e.g. ITEM123456" />
              </Form.Item>
              <Form.Item
                label="Commission Rate (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: "e.g. 15" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
              </Form.Item>
              <Form.Item
                label="Consignment Fee"
                name="consignmentFee"
                rules={[{ required: true, message: "e.g. 100000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 100000" />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: "Please select an expiry date" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select expiry date" />
              </Form.Item>
              <Form.Item
                label="Transaction Amount"
                name="dealingAmount"
                rules={[{ required: true, message: "e.g. 150000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
              </Form.Item>
            </>
          )}

          {/* Form for Offline Consignment */}
          {consignmentType === "offline" && (
            <>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: "e.g. Showa" }]}
              >
                <Input placeholder="e.g. Showa" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter a description" }]}
              >
                <Input.TextArea placeholder="Product description" rows={3} />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "e.g. 1" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} placeholder="e.g. 1" />
              </Form.Item>
              <Form.Item
                label="Commission Rate (%)"
                name="commissionPercentage"
                rules={[{ required: true, message: "e.g. 15" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
              </Form.Item>
              <Form.Item
                label="Transaction Amount"
                name="dealingAmount"
                rules={[{ required: true, message: "e.g. 150000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
              </Form.Item>
              <Form.Item
                label="Consignment Fee"
                name="consignmentFee"
                rules={[{ required: true, message: "e.g. 150000" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="VND" placeholder="e.g. 150000" />
              </Form.Item>
              <Form.Item label="Origin" name="origin">
                <Input placeholder="e.g. Japan" />
              </Form.Item>
              <Form.Item label="Age" name="age">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 2" />
              </Form.Item>
              <Form.Item label="Length (cm)" name="length">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 30" />
              </Form.Item>
              <Form.Item label="Species" name="species">
                <Input placeholder="e.g. Kohaku" />
              </Form.Item>
              <Form.Item label="Color" name="color">
                <Input placeholder="e.g. Red and White" />
              </Form.Item>
              <Form.Item label="Feeding Volume" name="feedingVolume">
                <Input placeholder="e.g. 200g per day" />
              </Form.Item>
              <Form.Item label="Filter Rate" name="filterRate">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 80" />
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
                  <Select.Option value="3D4FC185-049D-4A96-851B-1D320E7DBBA8">F1 Hybrid</Select.Option>
                  <Select.Option value="5F18BF0C-7199-462C-B023-3CCF1FD9F806">Pure Imported</Select.Option>
                  <Select.Option value="9A17DCF5-1426-45EE-A32E-C23EE5FE40D9">Pure Vietnamese</Select.Option>
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
              Submit Consignment Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ConsignmentForm;
