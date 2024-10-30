import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ContrastOutlined, HomeMiniOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const AdminSidebar = () => {
  return (
    <Sider className="bg-[#001529] min-h-screen">
      <div className="text-white text-center py-5 font-bold text-lg">
        <h2>Admin Portal</h2>
      </div>
      <Menu theme="dark" mode="inline" className="text-base">
        <Menu.Item key="admin" icon={<HomeMiniOutlined />}>
          <Link to="/admin">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/admin/manage-orders">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item key="consign" icon={<ContrastOutlined />}>
          <Link to="/admin/manage-consign">Quản lý ký gửi</Link>
        </Menu.Item>
        <Menu.Item key="approval" icon={<ContrastOutlined />}>
          <Link to="/admin/approval">Ký kết</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/admin/settings">Cài Đặt Hệ Thống</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;