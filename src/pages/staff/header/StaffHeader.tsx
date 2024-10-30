import { LogoutOutlined } from "@mui/icons-material";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const StaffHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  return (
    <Header className="bg-white px-5 flex justify-between items-center">
      <div className="flex items-center">
        <span className="mr-5 font-bold">Xin chào, Staff!</span>
        <LogoutOutlined className="text-xl cursor-pointer" onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default StaffHeader;
