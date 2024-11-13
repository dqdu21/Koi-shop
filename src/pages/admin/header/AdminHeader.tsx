import { LogoutOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Xoá token khỏi localStorage
    sessionStorage.removeItem('refreshToken');
    navigate('/');
  } // Điều hướng về trang chủ

  return (
    <Header className="bg-white px-5 flex justify-between items-center">
      <div className="flex items-center">
        <span className="mr-5 font-bold">Xin chào, Admin!</span>
        <LogoutOutlined className="text-xl cursor-pointer" onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default AdminHeader;
