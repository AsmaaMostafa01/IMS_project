import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Row,
  Col,
  List,
  Popconfirm,
  Tabs,
  Typography,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import setAuthHeader from '../api/setAuthHeader';
import UserAPIs from '../api/user.api';
import { IUserUpdate } from '../interfaces/domain/index';

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

interface JwtPayload {
  user: {
    id: string;
    type: string;
  };
  iat: number;
}

interface User extends IUserUpdate {
  firstName: string;
  lastName: string;
  mobile: string;
  password?: string;
}

function UserManagement() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'TeamLeader' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          message.error('No authentication token found. Please log in.');
          navigate('/login');
          return;
        }

        setAuthHeader(token);
        const decoded: JwtPayload = jwtDecode(token);
        const userRole = decoded.user.type;

        if (userRole === 'admin' || userRole === 'TeamLeader') {
          setCurrentUserRole(userRole as 'admin' | 'TeamLeader');
        }
        else {
          message.error('Invalid user role.');
          navigate('/unauthorized');
          return;
        }

        const userApi = new UserAPIs();
        const response = await userApi.getAllUsersApi();
        setUsers(response.data);
      }
      catch (error) {
        message.error('Failed to fetch users data. Please try again.');
        navigate('/login');
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const resetForm = () => {
    form.resetFields(); // Clear all form fields
  };

  const handleAddUser = async (values: User) => {
    try {
      const userApi = new UserAPIs();
      const newUser: IUserUpdate = {
        id: '',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        type: values.type,
        updatedAt: new Date(),
        passwordStatus: 'active',
      };

      // Check user role to restrict adding Team Leaders
      if (currentUserRole === 'TeamLeader' && values.type === 'TeamLeader') {
        message.error("Team Leaders can't add other Team Leaders.");
        return;
      }

      await userApi.createUserApi(newUser);
      message.success('User added successfully!');
      resetForm(); // Reset the form after adding a user

      const response = await userApi.getAllUsersApi(); // Refresh the user list
      setUsers(response.data);
    }
    catch (error) {
      message.error('Failed to add user. Please try again.');
      console.error('Add User Error:', error);
    }
  };

  const handleTabChange = (key: string) => {
    resetForm(); // Reset form fields on tab change
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={3}>User Management</Title>
        </Col>
        <Col>
          <Button style={{ float: 'right' }} onClick={resetForm}>
            Reset
          </Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Add User" key="1">
          <Row gutter={16} justify="center">
            <Col>
              <Card title="Add User" bordered={false} style={{ width: '700px' }}>
                <Form
                  form={form}
                  name="user_add_form"
                  onFinish={handleAddUser}
                  layout="vertical"
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    password: '',
                    confirmPassword: '',
                    type: undefined,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input the First Name!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input the Last Name!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the Email!' }]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="mobile"
                        label="Mobile"
                        rules={[{ required: true, message: 'Please input the Mobile!' }]}
                      >
                        <Input prefix={<MobileOutlined />} placeholder="Mobile" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          { required: true, message: 'Please input the Password!' },
                          { min: 6, message: 'Password must be at least 6 characters.' },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[
                          { required: true, message: 'Please confirm the Password!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords do not match!'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="type"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                    <Select placeholder="Select Role" suffixIcon={<TeamOutlined />}>
                      {currentUserRole === 'admin' && <Option value="admin">admin</Option>}
                      {currentUserRole === 'admin' && <Option value="TeamLeader">TeamLeader</Option>}
                      <Option value="Trainee">Trainee</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Add User
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="User List" key="2">
          <Row gutter={16}>
            <Col span={24}>
              <Card title="User List" bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={users}
                  renderItem={(user) => (
                    <List.Item
                      actions={[
                        <Popconfirm
                          title="Are you sure to delete this user?"
                          onConfirm={() => handleDeleteUser(user.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="link" icon={<DeleteOutlined />} />
                        </Popconfirm>,
                        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditUser(user.id)} />,
                      ]}
                    >
                      <List.Item.Meta
                        title={user.email}
                        description={`Name: ${user.firstName} ${user.lastName}, Mobile: ${user.mobile}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UserManagement;
