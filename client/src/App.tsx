import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Tasks from './pages/tasks';
import Users from './pages/Users';
<<<<<<< HEAD
import Programs from './pages/program';
import UserManagement from './pages/UserManagement';
import ProgramDetails from './pages/ProgramDetails';
=======
import UserManagement from './pages/UserManagement';
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c

const { Sider, Content } = Layout;

// Layout for pages that need it
function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>
      <Layout>
        <Header />
<<<<<<< HEAD
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            padding: '24px',
          }}
        >
=======
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', padding: '24px' }}>
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
          <Routes>
            {/* Define all the routes that need the layout */}
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
<<<<<<< HEAD
            <Route path="/programs" element={<Programs />} />
            <Route
              path="/user-management"
              element={<UserManagement currentUserRole="Team Leader" />}
            />
            <Route path="/programs/:programId" element={<ProgramDetails />} />
=======
            <Route path="/user-management" element={<UserManagement />} />

>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* The Login route without any layout */}
        <Route path="/login" element={<Login />} />

        {/* All other routes with the layout */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
