import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Typography, Card, Descriptions, message } from "antd";
import { ConsignmentOffline } from "../models/consignment";
import { queryConsignmentById } from "../services/consignmentService"; 

const { Title } = Typography;

const ConsignmentDetail: React.FC = () => {
  const { consignmentId } = useParams<{ consignmentId: string }>();
  const [consignment, setConsignment] = useState<ConsignmentOffline | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (consignmentId) {
      const fetchConsignmentDetail = async () => {
        try {
          const data = await queryConsignmentById(consignmentId);
          if (data && data.isSuccess) {
            setConsignment(data.result);
          } else {
            message.error("Không thể tải thông tin ký gửi.");
          }
        } catch (error) {
          message.error("Có lỗi xảy ra khi tải thông tin ký gửi.");
        } finally {
          setLoading(false);
        }
      };

      fetchConsignmentDetail();
    }
  }, [consignmentId]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto", marginTop: "20%" }} />;
  }

  if (!consignment) {
    return <div style={{ textAlign: "center", marginTop: "20%" }}>Không tìm thấy thông tin ký gửi</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 800, margin: "auto" }}>
      <Title level={2} style={{ color: "#8B0000", textAlign: "center" }}>
        Chi Tiết Ký Gửi Cá Koi
      </Title>

      <Card bordered={false} style={{ marginTop: 20 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Consignment ID">{consignment.id}</Descriptions.Item>
          <Descriptions.Item label="User ID">{consignment.userId}</Descriptions.Item>
          <Descriptions.Item label="Method">{consignment.method}</Descriptions.Item>
          <Descriptions.Item label="Commission Percentage">{`${consignment.commissionPercentage}%`}</Descriptions.Item>
          <Descriptions.Item label="Dealing Amount">{`${consignment.dealingAmount.toLocaleString()} VND`}</Descriptions.Item>
          <Descriptions.Item label="Status">{consignment.status}</Descriptions.Item>
          <Descriptions.Item label="Created At">{new Date(consignment.createdAt).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Updated At">{new Date(consignment.updatedAt).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Consignment Fee">{`${consignment.consignmentFee.toLocaleString()} VND`}</Descriptions.Item>
          <Descriptions.Item label="Expiry Date">
            {consignment.expiryDate ? new Date(consignment.expiryDate).toLocaleDateString() : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="For Sell">{consignment.isForSell ? "Yes" : "No"}</Descriptions.Item>

          {/* Product Information */}
          {consignment.product && (
            <>
              <Descriptions.Item label="Product Name">{consignment.product.name}</Descriptions.Item>
              <Descriptions.Item label="Description">{consignment.product.description}</Descriptions.Item>
              <Descriptions.Item label="Price">{`${consignment.product.price.toLocaleString()} VND`}</Descriptions.Item>
              <Descriptions.Item label="Origin">{consignment.product.origin || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Age">{consignment.product.age || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Length">{consignment.product.length ? `${consignment.product.length} cm` : "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Species">{consignment.product.species || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Color">{consignment.product.color || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Feeding Volume">{consignment.product.feedingVolume || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Filter Rate">{consignment.product.filterRate ? `${consignment.product.filterRate} lần/ngày` : "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Gender">{consignment.product.gender}</Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default ConsignmentDetail;
