import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";

const { Text } = Typography;

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string; // hoặc Date nếu bạn đang sử dụng kiểu Date
}

interface NotificationItemProps {
  notification: Notification;
  onAcknowledge: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onAcknowledge }) => {
  return (
    <Card className="mb-5 p-5 rounded-lg shadow-md flex justify-between items-center transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
      <div className="flex-1">
        <Text strong className="block mb-2">{notification.title}</Text>
        <Text className="block mb-2">{notification.message}</Text>
        <Text type="secondary" className="block">{notification.date}</Text>
      </div>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={() => onAcknowledge(notification.id)}
        className="ml-5"
      >
        Đã hiểu
      </Button>
    </Card>
  );
};

export default NotificationItem;
