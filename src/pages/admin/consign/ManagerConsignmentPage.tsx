import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import AdminSidebar from "../siderbar/AdminSiderbar";
import AdminHeader from "../header/AdminHeader";
import ConsignmentRequestItem from "../consignment/ConsignmentRequestItem";

const { Title } = Typography;

interface ConsignmentRequest {
  id: string;
  fishType: string;
  date: string;
  price: number;
  assignedTo: string;
}

const ManagerConsignmentPage: React.FC = () => {
  const [requests, setRequests] = useState<ConsignmentRequest[]>([
    {
      id: "REQ001",
      fishType: "Kohaku Koi",
      date: "2024-10-01",
      price: 2000000,
      assignedTo: "Chưa giao",
    },
    {
      id: "REQ002",
      fishType: "Showa Koi",
      date: "2024-10-03",
      price: 1800000,
      assignedTo: "Staff A",
    },
    {
      id: "REQ003",
      fishType: "Shiro Utsuri Koi",
      date: "2024-10-04",
      price: 1500000,
      assignedTo: "Chưa giao",
    },
  ]);

  const handleAssignStaff = (requestId: string, staff: string) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, assignedTo: staff } : request
    );
    setRequests(updatedRequests);
  };

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-y-auto">
          <Title level={2}>Quản Lý Yêu Cầu Ký Gửi</Title>
          <div className="flex flex-col gap-5 mt-5">
            {requests.map((request) => (
              <ConsignmentRequestItem
                key={request.id}
                request={request}
                onAssignStaff={handleAssignStaff}
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerConsignmentPage;
