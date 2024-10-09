<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
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
<<<<<<< HEAD
  Modal,
=======
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
<<<<<<< HEAD
  ExclamationCircleOutlined,
} from '@ant-design/icons';
=======
  MobileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import setAuthHeader from '../api/setAuthHeader';
import UserAPIs from '../api/user.api';
import { IUserUpdate } from '../interfaces/domain/index';
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

<<<<<<< HEAD
interface User {
  username: string;
  email: string;
  password: string;
  role: 'Team Leader' | 'Trainee';
}

interface Props {
  currentUserRole: 'Admin' | 'Team Leader';
}

function UserManagement({ currentUserRole }: Props) {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]); // State to manage users
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: User) => {
    if (editingUser) {
      // If editing an existing user, update their information
      setUsers((prevUsers) => prevUsers.map(
        (user) => (user.username === editingUser.username ? values : user),
      ));
      message.success(`User ${values.username} updated successfully!`);
    }
    else {
      // Add new user to the list
      setUsers((prevUsers) => [...prevUsers, values]);
      message.success(`User ${values.username} added successfully!`);
    }

    form.resetFields(); // Reset the form fields after submission
    setEditingUser(null); // Reset editing user state
    setIsModalVisible(false); // Close modal
  };

  const handleDelete = (username: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
    message.success(`User ${username} deleted successfully!`);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user); // Pre-fill the form with user data for editing
    setIsModalVisible(true); // Show modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null); // Reset editing user state
  };
=======
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
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={3}>User Management</Title>
        </Col>
        <Col>
<<<<<<< HEAD
          <Button type="primary" style={{ float: 'right' }} onClick={() => form.resetFields()}>
            Reset Form
=======
          <Button style={{ float: 'right' }} onClick={resetForm}>
            Reset
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
          </Button>
        </Col>
      </Row>

<<<<<<< HEAD
      <Tabs defaultActiveKey="1">
=======
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
        <TabPane tab="Add User" key="1">
          <Row gutter={16} justify="center">
            <Col>
              <Card title="Add User" bordered={false} style={{ width: '700px' }}>
                <Form
                  form={form}
                  name="user_add_form"
<<<<<<< HEAD
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input the Username!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Username" style={{ width: '90%' }} />
=======
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
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
<<<<<<< HEAD
                    <Col span={24}>
=======
                    <Col span={12}>
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the Email!' }]}
                      >
<<<<<<< HEAD
                        <Input prefix={<MailOutlined />} placeholder="Email" style={{ width: '90%' }} />
=======
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
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
<<<<<<< HEAD
                    <Col span={24}>
=======
                    <Col span={12}>
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          { required: true, message: 'Please input the Password!' },
                          { min: 6, message: 'Password must be at least 6 characters.' },
                        ]}
                      >
<<<<<<< HEAD
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ width: '90%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {currentUserRole === 'Admin' && (
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                          <Select placeholder="Select Role" suffixIcon={<TeamOutlined />} style={{ width: '90%' }}>
                            <Option value="Team Leader">Team Leader</Option>
                            <Option value="Trainee">Trainee</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                  {currentUserRole === 'Team Leader' && (
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="role"
                          label="Role"
                          initialValue="Trainee" // Automatically set role to Trainee for Team Leaders
                          rules={[{ required: true, message: 'Role must be Trainee!' }]}
                        >
                          <Select disabled style={{ width: '90%' }}>
                            <Option value="Trainee">Trainee</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '50%', margin: '0 auto', display: 'block' }}>
                      {editingUser ? 'Update User' : 'Add User'}
=======
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
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="User List" key="2">
<<<<<<< HEAD
          <Row gutter={16} justify="center">
            <Col>
              {/* List of Users */}
              <Card title="User List" bordered={false} style={{ width: '800px' }}>
                <List
=======
          <Row gutter={16}>
            <Col span={24}>
              <Card title="User List" bordered={false}>
                <List
                  itemLayout="horizontal"
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                  dataSource={users}
                  renderItem={(user) => (
                    <List.Item
                      actions={[
<<<<<<< HEAD
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>,
                        <Popconfirm
                          title="Are you sure you want to delete this user?"
                          onConfirm={() => handleDelete(user.username)}
                          okText="Yes"
                          cancelText="No"
                          icon={<ExclamationCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}
                          okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }} // Style for the "Yes" button
                          cancelButtonProps={{ style: { color: 'black' } }} // Optional: style for the "No" button
                          overlayStyle={{ fontSize: '18px' }} // Makes the pop-up bigger
                        >
                          <Button
                            type="link"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                            style={{ color: 'red' }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>,
                      ]}
                    >
                      <List.Item.Meta
                        title={user.username}
                        description={(
                          <>
                            <div>{user.email}</div>
                            <div style={{ fontStyle: 'italic', color: '#888' }}>
                              Role:
                              {' '}
                              {user.role}
                            </div>
                          </>
                        )}
=======
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
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
<<<<<<< HEAD

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Card bordered={false} style={{ width: '100%' }}>
          <Form
            form={form}
            name="user_edit_form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please input the Username!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please input the Email!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please input the Password!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            {currentUserRole === 'Admin' && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                    <Select placeholder="Select Role" suffixIcon={<TeamOutlined />} style={{ width: '90%' }}>
                      <Option value="Team Leader">Team Leader</Option>
                      <Option value="Trainee">Trainee</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
            {currentUserRole === 'Team Leader' && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="role"
                    label="Role"
                    initialValue="Trainee" // Automatically set role to Trainee for Team Leaders
                    rules={[{ required: true, message: 'Role must be Trainee!' }]}
                  >
                    <Select disabled style={{ width: '90%' }}>
                      <Option value="Trainee">Trainee</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Update User
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
=======
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
    </div>
  );
}

export default UserManagement;
