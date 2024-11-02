import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Avatar, Descriptions } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { getUserDetail } from '../services/usersService';
const { Title } = Typography;
const Profile: React.FC = () => {
  const { collapsed } = useSider();
  const fetchUserDetail = async () => {
    try {
      const response = await getUserDetail("7ba8b681-3109-4768-b4bf-4cfab0fd50fb");
        console.log('response :>> ', response);
    } catch (error: any) {
     
    } finally {

    }
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <div className="flex">
      <Layout className="min-h-screen flex flex-col">
        {/* Header */}
        <Header className="header fixed top-0 left-0 right-0 z-50">
          <AppHeader />
        </Header>

        {/* Layout with Sider and Content */}
        <Layout className="flex flex-1" style={{ paddingTop: '64px' }}>
          {/* Sider (Sidebar) */}
          <Sider
            className="sider fixed left-0 top-16 bottom-0 z-40"
            collapsed={collapsed}
            collapsedWidth={0}
            trigger={null}
            width={220}
          >
            <AppSider className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`} />
          </Sider>

          {/* Main Content */}
          <Layout
            className="flex flex-col flex-1"
            style={{ paddingLeft: collapsed ? '0px' : '220px' }}
          >
            <Content className="flex-grow overflow-auto p-8 bg-gray-50">
              {/* Main Content for Consignment Page */}
              <div className="container mx-auto py-8 px-4 lg:px-16 bg-white shadow-lg rounded-lg">
                <Card className="mb-6" bordered={false}>
                <div className="flex items-center">
                    <Avatar size={80} src="https://via.placeholder.com/150" />
                    <div className="ml-4">
                    <Title level={2}>Tên người dùng</Title>
                    <p>Email: user@example.com</p>
                    </div>
                </div>
                </Card>
                <Card title="Thông tin chi tiết" bordered={false}>
                <Descriptions column={1}>
                    <Descriptions.Item label="Ngày sinh">01/01/1990</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">0123456789</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">123 Đường ABC, Thành phố XYZ</Descriptions.Item>
                </Descriptions>
                </Card>
              </div>
            </Content>

            {/* Footer */}
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Profile;
