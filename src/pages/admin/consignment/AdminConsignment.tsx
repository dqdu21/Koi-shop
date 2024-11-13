import { Layout, message, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { queryAdminConsignments, approveConsignment } from "@/services/consignmentService";

const { Content } = Layout;

interface Consignment {
  id: string;
  method: string;
  commissionPercentage: number;
  dealingAmount: number;
  status: string;
  isForSell: boolean;
  createdAt: string;
  updatedAt: string;
  consignmentFee: number;
  expiryDate: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    origin: string;
    age: number;
    weight: number;
    length: number;
    species: string;
    color: string;
    gender: string;
    inventory: number;
    status: string;
  };
}

export default function AdminConsignment() {
  const [consignments, setConsignments] = useState<Consignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsignment, setSelectedConsignment] = useState<Consignment | null>(null);

  const fetchConsignments = async () => {
    setLoading(true);
    try {
      const queryData = {
        page: 1,
        pageSize: 10,
      };
      const res = await queryAdminConsignments(queryData);
      setConsignments(res.result.data);
    } catch (error) {
      console.error("Failed to fetch consignments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConsignments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteConsignment(id);
      fetchConsignments();
      message.success("Consignment deleted successfully.");
    } catch (error) {
      message.error("Failed to delete consignment.");
      console.error("Failed to delete consignment:", error);
    }
  };

  const handleApprove = async (consignmentId: string) => {
    try {
      await approveConsignment(consignmentId, true); 
      message.success("Consignment approved successfully");


      setConsignments((prevConsignments) =>
        prevConsignments.map((consignment) =>
          consignment.id === consignmentId
            ? { ...consignment, status: "Approved" }
            : consignment
        )
      );
    } catch (error: any) {
      message.error(error.message || "Failed to approve consignment.");
    }
  };

  const columns = [
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Commission %",
      dataIndex: "commissionPercentage",
      key: "commissionPercentage",
    },
    {
      title: "Dealing Amount",
      dataIndex: "dealingAmount",
      key: "dealingAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text: string) => (text ? new Date(text).toLocaleDateString() : "N/A"),
    },
    {
      title: "Product",
      dataIndex: ["product", "name"],
      key: "productName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Consignment) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedConsignment(record);
              setIsModalOpen(true);
            }}
          />
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            type="primary"
            style={{ marginLeft: "8px" }}
          >
            Approve
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Typography.Title level={2}>Consignments</Typography.Title>
            <Table
              dataSource={consignments}
              columns={columns}
              loading={loading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </div>

          <Modal
            title="Consignment Details"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            {selectedConsignment && (
              <div>
                <p><strong>Method:</strong> {selectedConsignment.method}</p>
                <p><strong>Commission Percentage:</strong> {selectedConsignment.commissionPercentage}</p>
                <p><strong>Dealing Amount:</strong> {selectedConsignment.dealingAmount}</p>
                <p><strong>Status:</strong> {selectedConsignment.status}</p>
                <p><strong>Expiry Date:</strong> {selectedConsignment.expiryDate}</p>
                <p><strong>Product Name:</strong> {selectedConsignment.product.name}</p>
                <p><strong>Product Description:</strong> {selectedConsignment.product.description}</p>
                <p><strong>Product Price:</strong> {selectedConsignment.product.price}</p>
                <p><strong>Product Origin:</strong> {selectedConsignment.product.origin}</p>
              </div>
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
