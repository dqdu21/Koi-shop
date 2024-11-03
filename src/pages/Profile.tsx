import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Avatar, Descriptions, notification, Button, Modal, Form, Input } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { changePassword, getProfile } from '../services/usersService';
import { User } from '../models/Types';
const { Title } = Typography;
const Profile: React.FC = () => {
  const { collapsed } = useSider();
  const [dataUser,setDataUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      console.log('response :>> ', response);
      setDataUser(response)
    } catch (error: any) {
      notification.error({
        message: "Get profile Failed",
        description: error.message || "Get profile Failed.",
      });
    }
  };
  const handleChangePassword = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk =async (values: { currentPassword: string; newPassword: string }) => {
    console.log('Password change values:', values);
    const refreshToken = sessionStorage.getItem("refreshToken")
    if (!refreshToken) {
      notification.error({
        message: "Refresh token not found",
        description: "Refresh token not found. Please log in again.",
      });
      return;
    }
    const ChangePassword = await changePassword(refreshToken ,values?.currentPassword,values?.newPassword)
    console.log('ChangePassword :>> ', ChangePassword);
    if(ChangePassword && ChangePassword?.statusCode===200){
      notification.success({
        message: "Password change successfully",
        description: ChangePassword?.message
      });
      setIsModalVisible(false);
    }else{
      notification.error({
        message: "Password change failed",
        description: ChangePassword?.message
      });
    }
    
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  console.log('dataUser?.data?.avatar :>> ', dataUser?.data?.address);
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
                    {dataUser && dataUser?.data?.avatar ? (
                      <Avatar size={80} src={dataUser?.data?.avatar} />
                    ) : (
                      <Avatar size={80} src="https://icons.veryicon.com/png/o/miscellaneous/icon-icon-of-ai-intelligent-dispensing/login-user-name-1.png" />
                    )}
                    <div className="ml-4">
                      <Title level={2}>{dataUser?.data?.fullName || "No username"}</Title>
                      <p>{dataUser?.data?.email}</p>
                    </div>
                  </div>
                </Card>
                <Card title="Detailed information" bordered={false}>
                  <Descriptions column={1}>
                    <Descriptions.Item label="Phone number">{dataUser?.data?.phone}</Descriptions.Item>
                    {dataUser?.data?.address && dataUser.data.address.length > 0 ? (
                      dataUser.data.address.map((addr) => (
                        <Descriptions.Item label="Address" key={addr.id}>
                          {addr.street}, {addr.wardCode}, {addr.districtId}, {addr.provinceId}
                        </Descriptions.Item>
                      ))
                    ) : (
                      <Descriptions.Item label="Address">No Address</Descriptions.Item>
                    )}
                    <Descriptions.Item label="Email">{dataUser?.data?.email}</Descriptions.Item>
                  </Descriptions>
                </Card>
                <div className="mt-4">
                  <Button type="primary" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>

                <Modal
                title="Change Password"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form
                  name="changePassword"
                  onFinish={handleOk}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[
                      { required: true, message: "Please enter the password!" },
                      { min: 6, message: "Password must be at least 6 characters!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: "Please enter the password!" },
                      { min: 6, message: "Password must be at least 6 characters!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                      { required: true, message: 'Please confirm your new password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
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
