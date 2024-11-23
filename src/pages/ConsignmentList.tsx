import React, { useState } from "react";
import { Table, Button, Tooltip, Popconfirm, message, Modal, Form, InputNumber, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import useConsignmentData from "@/components/hooks/consignment/useConsignmentData"; 
import { ConsignmentOffline } from "../models/consignment";
import { deleteConsignment, updateConsignment, payConsignment } from "../services/consignmentService";
import MainLayout from "@/components/layout/MainLayout";

const ConsignmentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingConsignmentId, setEditingConsignmentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, loading, totalItems, refetch } = useConsignmentData(currentPage, pageSize);

  const handlePayment = async (id: string) => {
    try {
      const response = await payConsignment(id);
      if (response?.isSuccess && response.result?.data) {
        const paymentUrl = response.result.data;
        window.location.href = paymentUrl; // Redirect to payment page
      } else {
        message.error("Admin has not checked yet.");
      }
    } catch (error) {
      message.error("An error occurred while processing the payment.");
    }
  };

  const handleEditConsignment = (id: string) => {
    setEditingConsignmentId(id);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleDeleteConsignment = async (id: string) => {
    try {
      await deleteConsignment(id);
      message.success("Consignment deleted successfully.");
      refetch();
    } catch (error) {
      message.error("Failed to delete consignment.");
    }
  };

  const handleModalSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingConsignmentId) {
        await updateConsignment(editingConsignmentId, {
          ...values,
          expiryDate: values.expiryDate.toISOString(),
        });
        message.success("Consignment updated successfully.");
        setIsModalOpen(false);
        refetch();
      }
    } catch (error) {
      message.error("Failed to update consignment.");
    }
  };

  const columns: ColumnsType<ConsignmentOffline> = [
    {
      title: "Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Description",
      dataIndex: ["product", "description"],
      key: "description",
      render: (text: string) => (
        <Tooltip title={text}>
          <div
            style={{
              maxWidth: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Price",
      dataIndex: "dealingAmount",
      key: "dealingAmount",
      render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
      title: "Payment",
      key: "payment",
      align: "center",
      render: (_, record) => (
        <Button onClick={() => handlePayment(record.id)} type="primary">
          Payment
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      align: "center",
      render: (_, record) => (
        <Button onClick={() => handleEditConsignment(record.id)} type="primary">
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this consignment?"
          onConfirm={() => handleDeleteConsignment(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <MainLayout> 
      <div className="p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 800, margin: "auto" }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
          Koi Fish Consignment List
        </h2>

        <Table<ConsignmentOffline>
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize,
            total: totalItems,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              refetch();
            },
            showSizeChanger: true,
          }}
        />

        <Modal
          title="Edit Consignment"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleModalSave}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Commission Percentage"
              name="commissionPercentage"
              rules={[{ required: true, message: "Please enter commission percentage" }]}
            >
              <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="e.g. 15" />
            </Form.Item>
            <Form.Item
              label="Dealing Amount"
              name="dealingAmount"
              rules={[{ required: true, message: "Please enter dealing amount" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 300000" />
            </Form.Item>
            <Form.Item
              label="Consignment Fee"
              name="consignmentFee"
              rules={[{ required: true, message: "Please enter consignment fee" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 200000" />
            </Form.Item>
            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[{ required: true, message: "Please select expiry date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout> 
  );
};

export default ConsignmentList;
