// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Programs from './pages/Programs';
import Tasks from './pages/Tasks';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '80px 20px' }}> 
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
