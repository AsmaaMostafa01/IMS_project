import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Projects from './pages/Projects';
import Tasks from './pages/tasks';
import Programs from './pages/Programs';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} className="site-layout-background">
          <Sidebar />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial', padding: '24px' }}>
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
