import { Button, Card, Col, Modal, Row, Tag, Typography } from "antd";
import React, { useState } from "react";

const { Text } = Typography;

interface ApprovalItemProps {
  consignment: {
    id: string;
    productName: string;
    date: string;
    expectedPrice: number;
    status: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApprovalItem: React.FC<ApprovalItemProps> = ({
  consignment,
  onApprove,
  onReject,
}) => {
  const [isApproved, setIsApproved] = useState(consignment.status === "Đã ký");

  const handleApprove = () => {
    setIsApproved(true);
    onApprove(consignment.id);
    Modal.success({
      title: "Thành công",
      content: `Yêu cầu ký gửi ${consignment.id} đã được ký thành công.`,
    });
  };

  const handleReject = () => {
    onReject(consignment.id);
    Modal.error({
      title: "Từ chối",
      content: `Yêu cầu ký gửi ${consignment.id} đã bị từ chối.`,
    });
  };

  return (
    <Card className="mb-5 p-5 rounded-lg shadow-md">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={4}>
          <Text strong className="block text-gray-700 mb-1">Mã Ký Gửi:</Text>
          <Text className="text-gray-800">{consignment.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong className="block text-gray-700 mb-1">Tên Sản Phẩm:</Text>
          <Text className="text-gray-800">{consignment.productName}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong className="block text-gray-700 mb-1">Ngày Gửi:</Text>
          <Text className="text-gray-800">{consignment.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong className="block text-gray-700 mb-1">Giá Dự Kiến:</Text>
          <Text className="text-gray-800">{consignment.expectedPrice.toLocaleString()} VND</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong className="block text-gray-700 mb-1">Trạng Thái:</Text>
          <Tag color={isApproved ? "green" : "orange"}>
            {isApproved ? "Đã ký" : "Đang chờ ký"}
          </Tag>
        </Col>

        <Col xs={24} md={2}>
          <Button type="primary" onClick={handleApprove} disabled={isApproved}>
            Ký
          </Button>
        </Col>
        <Col xs={24} md={2}>
          <Button type="primary" danger onClick={handleReject} disabled={isApproved}>
            Từ chối
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ApprovalItem;
