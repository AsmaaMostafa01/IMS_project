import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Tabs,
  Empty,
  Card,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons';
import '../style/Useredit.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';
import setAuthHeader from '../api/setAuthHeader'; // Import the setAuthHeader utility
import UserAPIs from '../api/user.api'; // Import the API
import { IUserUpdate, UserTypeEnum } from '../interfaces/domain/index'; // Import IUserUpdate

const { Option } = Select;
const { TabPane } = Tabs;

interface JwtPayload {
  user: {
      id: string;
      type: string; // Add more properties if needed
  };
  iat: number; // Issued at
}
interface User {
  id: string;
  // username: string;
  email: string;
  type: UserTypeEnum;
  firstName: string; // Required property
  lastName: string; // Required property
  mobile: string; // Required property
  updatedAt?: Date; // Optional property
  password?: string; // Optional property for updating password
}

function UserEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFormValues, setModalFormValues] = useState<User | null>(null); // Renamed for clarity

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthHeader(token);
          const decoded: JwtPayload = jwtDecode(token);
          const userId = decoded.user.id; // Ensure 'id' is correct
          console.log(`Fetching user with ID: ${userId}`);
          const userApi = new UserAPIs();
          const response = await userApi.getUserByIdApi(userId);
          console.log('Fetched User Data:', response.data);
          const userData = response.data.user.user;
          setUser(userData);
          setLoading(false);
        }
      }
      catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Failed to fetch user data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const showModal = (values: User) => {
    setModalFormValues(values); // Set the values for the modal
    setIsModalVisible(true);
  };

  const mapToIUserUpdate = (formValues: User): IUserUpdate => ({
    id: formValues.id,
    // username: formValues.username,
    email: formValues.email,
    password: formValues.password, // Optional
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    mobile: formValues.mobile,
    type: formValues.type,
    updatedAt: new Date(), // Set current date
    passwordStatus: 'active', // Assuming this is required, set an appropriate value
  });

  const handleOk = async () => {
    try {
      const userApi = new UserAPIs();
      if (user?.id && modalFormValues) {
        const updatedUser: IUserUpdate = mapToIUserUpdate(modalFormValues);
        await userApi.updateUserByIdApi(user.id, updatedUser);
        message.success({
          content: 'User information updated successfully!',
          style: { fontSize: '18px', textAlign: 'center' },
        });
        setIsModalVisible(false);
      }
    }
    catch (error) {
      message.error('Failed to update user information. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: User & { password?: string }) => {
    showModal(values);
  };

  const handleTabChange = (key: string) => {
    if (key === '2') {
      navigate('/user-management'); // Change to your User Management route
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      <Card title="Edit User Information" bordered={false} style={{ width: '800px', margin: '0 auto' }}>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Edit Info" key="1">
            {user ? (
              <Form
                name="user_edit_form"
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  mobile: user.mobile,
                  type: user.type,

                }}
                onFinish={onFinish}
                layout="vertical"
                className="user-edit-form"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="firstName" label="First Name">
                      <Input prefix={<UserOutlined />} placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="lastName" label="Last Name">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email">
                      <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="mobile" label="Mobile">
                      <Input placeholder="Mobile" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="password" label="Password">
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="confirmPassword" label="Confirm Password">
                      <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="type" label="type">
                  <Select placeholder="Select Role" suffixIcon={<TeamOutlined />}>
                    <Option value="Admin">Admin</Option>
                    <Option value="Team Leader">Team Leader</Option>
                    <Option value="Trainee">Trainee</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit" style={{ width: '80%', padding: '5px 15px' }}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Empty description="No user data available" />
            )}
          </TabPane>
          <TabPane tab="User Management" key="2">
            <Empty description="Manage your users here" />
          </TabPane>
          <TabPane tab="Archived Users" key="3">
            <Empty description="Manage archived users here" />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Confirm Changes"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        width={600}
      >
        <p>Are you sure you want to save the changes?</p>
        <p>
          <strong>First Name:</strong>
          {' '}
          {modalFormValues?.firstName}
        </p>
        <p>
          <strong>Last Name:</strong>
          {' '}
          {modalFormValues?.lastName}
        </p>
        <p>
          <strong>Email:</strong>
          {' '}
          {modalFormValues?.email}
        </p>
        <p>
          <strong>Role:</strong>
          {' '}
          {modalFormValues?.type}
        </p>
      </Modal>
    </div>
  );
}

export default UserEdit;
