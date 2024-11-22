import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
  ProductFilled,
  DropboxOutlined
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
          <Link to="/admin">Home</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/admin/manage-orders">Manage Orders</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Manage Users</Link>
        </Menu.Item>
        <Menu.Item key="product" icon={<ProductFilled />}>
          <Link to="/admin/product-manage">Manage Products</Link>
        </Menu.Item>
        <Menu.Item key="product" icon={<DropboxOutlined />}>
          <Link to="/admin/batch">Manage Batch</Link>
        </Menu.Item>
        <Menu.Item key="consign" icon={<ContrastOutlined />}>
          <Link to="/admin/consignments">Manage Consignments</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/admin/settings">System Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
