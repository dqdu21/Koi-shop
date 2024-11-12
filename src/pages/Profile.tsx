import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Avatar, Descriptions, notification, Button, Modal, Form, Input, List, Rate, Row, Col } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { addFeedback, changePassword, deleteFeedback, getFeedback, getProfile, putFeedback } from '../services/usersService';
import {  User } from '../models/Types';
import {  Button  as Btn} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getOrderHistory } from '@/services/orderService';
const { Title } = Typography;
interface FeedbackData {
  id: string;
  description: string;
  rating: number;
  productId: string;
  userId: string;
  product: string;
  user: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { collapsed } = useSider();
  const [dataUser,setDataUser] = useState<User | null>(null)
  const [listProductBuy, setListProductBuy] = useState<any[]>([]);
  const [reload,setReload] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idProductBuy, setIdProductBuy] = useState<string>("");
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const fetchListProductBuy = async() => {
    const res = await getOrderHistory()
    const allProducts = res?.flatMap((order: any) => 
      order?.orderItems?.map((item: any) => item.product)
    );
    setListProductBuy(allProducts)
  }
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const id = response?.data?.id;
      fetchFeedback(id);
      setDataUser(response)
    } catch (error: any) {
      notification.error({
        message: "Get profile Failed",
        description: error.message || "Get profile Failed.",
      });
    }
  };
  const handleSave = async() => {
    if(isEditing){
      const res = await putFeedback(idProductBuy,description,rating)

      if(res.statusCode === 200){
        notification.success({
          message: "Edit FeedBack successfully",
          description: "Feedback updated successfully.",
        })
      }else{
        notification.error({
          message: "Edit FeedBack Failed",
          description: "Edit FeedBack Failed.",
        })
      }
      setIsModalVisible1(false); 
      setIdProductBuy("");
    }else{
      if(idProductBuy===""){
        notification.error({
          message: "Add FeedBack Failed",
          description: "Please select the product.",
        })
      }{
        const res = await addFeedback(idProductBuy,description,rating)

        if(res.statusCode===201){
          notification.success({
            message: "Add FeedBack successfully",
            description: "Add FeedBack successfully.",
          })
        }{
          notification.error({
            message: "Add FeedBack Failed",
            description: "You have already feedback on this product.",
          })
        }
        setIsModalVisible1(false); 
        setReload(!reload);
        setIdProductBuy("");
      }
    }
  };
  const handleAddFeedback = () =>{
    setIsEditing(false);
    setDescription('');
    setRating(0);
    setIsModalVisible1(true);
  }
  const handleEdit = (id: string) => {
    setIdProductBuy(id);
    setIsEditing(true);   
    const feedbackToEdit = feedbackList.find(feedback => feedback.id === id);
    if (feedbackToEdit) {
      setDescription(feedbackToEdit.description);
      setRating(feedbackToEdit.rating);
      setIsModalVisible1(true); 
    }
  };
  const handleCancelEdit = () => {
    setIsModalVisible1(false);
  };
  const handleChangePassword = () => {
    setIsModalVisible(true);
  };
  const fetchFeedback = async (id: string) => {
    try {
      const feedbackResponse = await getFeedback(id);
      if (Array.isArray(feedbackResponse?.result?.data)) {
        setFeedbackList(feedbackResponse.result.data);
      } else {

      }
    } catch (error: any) {
      notification.error({
        message: "Get feedback failed",
        description: error.message || "Failed to load feedback.",
      });
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this feedback?',
      content: 'Once deleted, this action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async() => {
        await deleteFeedback(id)
        notification.success({
          message: "Delete feedback success",
          description: "Delete feedback success",
        })
        setReload(!reload)
      },
    });
  };
  const handleOk =async (values: { currentPassword: string; newPassword: string }) => {
    const refreshToken = sessionStorage.getItem("refreshToken")
    if (!refreshToken) {
      notification.error({
        message: "Refresh token not found",
        description: "Refresh token not found. Please log in again.",
      });
      return;
    }
    const ChangePassword = await changePassword(refreshToken ,values?.currentPassword,values?.newPassword)
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
      fetchListProductBuy();
  }, [reload]);
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
                  <div className="flex flex-row justify-between items-center">
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
                  <Btn className='bg-red-500 text-white' onClick={() => navigate('/order-history')}>Order history</Btn>
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
              <Card title={
                <Row justify="space-between" align="middle">
                  <Col>
                    Feedback
                  </Col>
                  <Col>
                    <Button type="primary" onClick={handleAddFeedback}  >Add Feedback</Button>
                  </Col>
                </Row>
              } className="mt-6">
                <List
                  itemLayout="horizontal"
                  dataSource={feedbackList}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button>,
                        <Button
                          type="link"
                          danger
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        title={<span>{item?.description}</span>}
                        description={
                          <>
                            <div>Rating: {item?.rating}</div>
                            <div>Product: {item?.product}</div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
              <Modal
                title={isEditing ? "Edit Feedback" : "Add Feedback"}
                open={isModalVisible1}
                onCancel={handleCancelEdit}
                onOk={handleSave} 
                okText="Save"
                cancelText="Cancel"
              >
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <label>Description:</label>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label>Rating:</label>
                    <Rate
                      value={rating}
                      onChange={setRating}
                    />
                  </div>
                  {!isEditing &&
                    <div style={{ marginTop: 16 }}>
                      <label>Purchased Products:</label>
                      <div
                        style={{
                          maxHeight: '200px',
                          overflowY: 'auto',
                        }}
                      >
                        <List
                          dataSource={listProductBuy}
                          renderItem={(product) => (
                            <List.Item
                              actions={[
                                <Button 
                                  type="primary" 
                                  size="small" 
                                  onClick={() => setIdProductBuy(product.id)}  
                                  disabled={product.id===idProductBuy}
                                >
                                  Select
                                </Button>
                              ]}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div>
                                  <strong>{product.name}</strong> - ${product.price}
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </div>
                
                  }
                </div>
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
