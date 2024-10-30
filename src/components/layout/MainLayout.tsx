import React from 'react';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useSider } from '../../app/context/SiderProvider';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppFooter from './AppFooter';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { collapsed } = useSider();

  return (
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
            {children}
          </Content>

          {/* Footer */}
          <Footer className="footer mt-auto">
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
