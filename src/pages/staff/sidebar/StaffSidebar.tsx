import {
  DashboardOutlined,
  InboxOutlined,
  NotificationFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { HomeMaxOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const StaffSidebar = () => {
  return (
    <Sider className="bg-[#001529] min-h-screen">
      <div className="text-white text-center py-5 font-bold text-lg">
        <h2>Staff Portal</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["staff"]}>
        <Menu.Item key="staff" icon={<HomeMaxOutlined />}>
          <Link to="/staff">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          <Link to="/staff/orders">Quản Lý Đơn Hàng</Link>
        </Menu.Item>
        <Menu.Item key="consignments" icon={<InboxOutlined />}>
          <Link to="/staff/consignments">Quản Lý Ký Gửi</Link>
        </Menu.Item>
        <Menu.Item key="create" icon={<ShoppingCartOutlined />}>
          <Link to="/staff/create">Thêm cá koi</Link>
        </Menu.Item>
        <Menu.Item key="notification" icon={<NotificationFilled />}>
          <Link to="/staff/notification">Thông báo</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default StaffSidebar;