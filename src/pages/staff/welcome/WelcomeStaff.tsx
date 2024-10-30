import { Layout, Typography } from "antd";
import StaffHeader from "../header/StaffHeader";
import StaffSidebar from "../sidebar/StaffSidebar";


const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAdmin = () => {
  return (
    <Layout className="h-screen">
      <StaffSidebar />
      <Layout>
        <StaffHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Title level={2}>Chào mừng đến với Staff Portal</Title>
            <Text>Đây là trang quản lý dành riêng cho nhân viên.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeAdmin;
