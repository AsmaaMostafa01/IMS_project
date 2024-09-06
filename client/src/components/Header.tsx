import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import './Header.css'; 

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  return (
    <Header className="site-layout-background header">
      <div className="logo">
        <img src="/logo-corelia-forme.svg" alt="Corelia Logo" className="logo-img" />
        <Title level={4} className="header-title">Internship Management System at CORELIA company</Title>
      </div>
   
      <div className="header-actions">
        <Button icon={<SearchOutlined />} className="header-button">Search</Button>
        <Button icon={<LogoutOutlined />} className="header-button">Logout</Button>
      </div>
    </Header>
  );
};

export default AppHeader;
