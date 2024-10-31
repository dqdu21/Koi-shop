import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, AppstoreOutlined, SettingOutlined, QuestionCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Book } from '@mui/icons-material';
import SubMenu from 'antd/es/menu/SubMenu';

const AppSider: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();
  return (
    <div className={`h-[calc(100vh-4rem)] bg-white`}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
//        defaultOpenKeys={['sub1']}  Lí do sub menu tự nhảy
        className="border-r-0 h-full"
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate('/')}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<InfoCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate("/about")}
        >
          Information
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<AppstoreOutlined />}
          title="Products"
          className="text-gray-700 hover:text-red-800"
        >
          <Menu.Item key="3" className="text-gray-600 hover:bg-gray-100 hover:text-red-800">
            Food
          </Menu.Item>
          <Menu.Item key="4" className="text-gray-600 hover:bg-gray-100 hover:text-red-800">
            Item
          </Menu.Item>
          <Menu.Item key="5" className="text-gray-600 hover:bg-gray-100 hover:text-red-800">
            Others
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="9"
          icon={<SettingOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate("/consignment")}
        >
          Consignment
        </Menu.Item>

        <Menu.SubMenu
          key="10"
          icon={<Book />}
          title="Blog"
          className="text-gray-700"
          popupClassName="bg-gray-100"  
          >
          <Menu.Item key="10-1" onClick={() => navigate("/blog/fkoi-shop/news")} className="hover:bg-gray-200 text-gray-600">
            News
          </Menu.Item>
          <Menu.Item key="10-2" onClick={() => navigate("/blog/fkoi-shop/koi-tips")} className="hover:bg-gray-200 text-gray-600">
            Koi Tips
          </Menu.Item>
          <Menu.Item key="10-3" onClick={() => navigate("/blog/fkoi-shop/customer-story")} className="hover:bg-gray-200 text-gray-600">
            Customer Story
          </Menu.Item>
          <Menu.Item key="10-4" onClick={() => navigate("/blog/faqs")} className="hover:bg-gray-200 text-gray-600">
            FAQs
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          key="11"
          icon={<QuestionCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate("/help")}
        >
          Help
        </Menu.Item>
        <Menu.Item
          key="12"
          icon={<PhoneOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate("/contact")}
        >
          Contact
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppSider;
