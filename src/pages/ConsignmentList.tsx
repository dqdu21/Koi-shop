import React, { useState } from "react";
import { Table, Space, Button, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import useConsignmentData from "../components/hooks/consignment/useConsignmentData";
import { ConsignmentOffline } from "../models/consignment";

const ConsignmentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Chỉ sử dụng ConsignmentOffline trong hook và Table
  const { data, loading, totalItems, refetch } = useConsignmentData(currentPage, pageSize);

  const columns: ColumnsType<ConsignmentOffline> = [
    {
      title: "Consignment ID",
      dataIndex: "id", // Sử dụng "id" từ ConsignmentOffline
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: ["product", "name"], // Lấy tên từ product trong ConsignmentOffline
      key: "name",
    },
    {
      title: "Description",
      dataIndex: ["product", "description"], // Lấy mô tả từ product trong ConsignmentOffline
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
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleViewConsignment(record.id)}>View</Button>
        </Space>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    refetch();
  };

  const handleViewConsignment = (consignmentId: string) => {
    navigate(`/consignment/${consignmentId}`);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 800, margin: "auto" }}>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
        Danh Sách Ký Gửi Cá Koi
      </h2>

      <Table<ConsignmentOffline>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id" // Đảm bảo rằng đây là trường khóa chính của mỗi record
        pagination={{
          current: currentPage,
          pageSize,
          total: totalItems,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
        style={{ color: "#1f2937" }}
      />
    </div>
  );
};

export default ConsignmentList;
