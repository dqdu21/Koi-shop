import React, { useState } from "react";
import { Button, Card, Col, Row, Select, Typography } from "antd";

interface ConsignmentRequestItemProps {
  request: {
    id: string;
    fishType: string;
    date: string;
    price: number;
    assignedTo?: string;
  };
  onAssignStaff: (id: string, staff: string) => void;
}

const { Text } = Typography;
const { Option } = Select;

const ConsignmentRequestItem: React.FC<ConsignmentRequestItemProps> = ({
  request,
  onAssignStaff,
}) => {
  const [assignedTo, setAssignedTo] = useState(request.assignedTo || "Chưa giao");

  const handleAssignChange = (value: string) => {
    setAssignedTo(value);
    onAssignStaff(request.id, value);
  };

  return (
    <Card className="mb-5 p-5 rounded-lg shadow-lg transform transition duration-300 hover:translate-y-[-5px] hover:shadow-xl">
      <Row gutter={[16, 16]}>
        {/* Request Info */}
        <Col xs={24} md={4}>
          <Text strong className="block text-gray-700 mb-1">Mã Yêu Cầu:</Text>
          <Text className="text-gray-800">{request.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong className="block text-gray-700 mb-1">Loại Cá:</Text>
          <Text className="text-gray-800">{request.fishType}</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong className="block text-gray-700 mb-1">Ngày Yêu Cầu:</Text>
          <Text className="text-gray-800">{request.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong className="block text-gray-700 mb-1">Giá Mong Muốn:</Text>
          <Text className="text-gray-800">{request.price.toLocaleString()} VND</Text>
        </Col>

        {/* Staff Assignment */}
        <Col xs={24} md={5}>
          <Text strong className="block text-gray-700 mb-1">Nhân Viên Phụ Trách:</Text>
          <Select
            value={assignedTo}
            onChange={handleAssignChange}
            className="w-full border rounded px-3 py-1 text-gray-800"
          >
            <Option value="Chưa giao">Chưa giao</Option>
            <Option value="Staff A">Staff A</Option>
            <Option value="Staff B">Staff B</Option>
            <Option value="Staff C">Staff C</Option>
          </Select>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={3}>
          <Button type="primary" className="w-full">Xem Chi Tiết</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ConsignmentRequestItem;
