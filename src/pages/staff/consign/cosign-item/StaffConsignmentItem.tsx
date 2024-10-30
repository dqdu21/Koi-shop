import { Button, Card, Col, Row, Select, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Option } = Select;

interface Consignment {
  id: string;
  productName: string;
  date: string;
  expectedPrice: number;
  status: string;
}

interface StaffConsignmentItemProps {
  consignment: Consignment;
}

const StaffConsignmentItem: React.FC<StaffConsignmentItemProps> = ({ consignment }) => {
  const [status, setStatus] = useState<string>(consignment.status);
  const navigate = useNavigate();

  const handleStatusChange = (value: string) => {
    setStatus(value);
    console.log(`Consignment ${consignment.id} updated to status: ${value}`);
  };

  return (
    <Card className="mb-5 p-5 rounded-lg shadow-md">
      <Row gutter={[16, 16]}>
        {/* Consignment Info */}
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

        {/* Status Selection */}
        <Col xs={24} md={4}>
          <Text strong className="block text-gray-700 mb-1">Trạng Thái:</Text>
          <Select
            value={status}
            onChange={handleStatusChange}
            className="w-full"
          >
            <Option value="Đang chờ duyệt">Đang chờ duyệt</Option>
            <Option value="Đang xem xét">Đang xem xét</Option>
            <Option value="Đã xem xét">Đã xem xét</Option>
            <Option value="Hủy bỏ">Hủy bỏ</Option>
          </Select>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={2}>
          <Button
            type="primary"
            onClick={() => navigate(`/staff/consignments/${consignment.id}`)}
          >
            Xem Chi Tiết
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default StaffConsignmentItem;
