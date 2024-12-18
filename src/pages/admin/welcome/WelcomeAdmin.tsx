import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAdmin = () => {
  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Title level={2}>Welcome to the Admin Portal</Title>
            <Text>This is the management page dedicated to administrators.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeAdmin;
