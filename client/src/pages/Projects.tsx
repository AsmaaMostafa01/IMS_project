import React from 'react';
import { Button, Tabs, Table, Empty } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

interface Task {
  key: string;
  name: string;
  dueDate: string;
}

const columns = [
  {
    title: 'Task Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <a>Delete</a>,  
  },
];

const data: Task[] = [
  { key: '1', name: 'Project 1', dueDate: '2024-09-15' },
  { key: '2', name: 'Project 2', dueDate: '2024-09-20' },
  { key: '3', name: 'Project 3', dueDate: '2024-09-25' },
];

const Projects: React.FC = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
      <h1>Projects</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
          {data.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <Empty description="No data" />}
        </TabPane>
        <TabPane tab="Archived" key="2">
          <Empty description="No data" />
        </TabPane>
      </Tabs>
      <Button type="primary" style={{ marginTop: '16px' }}>
        <Link to="/tasks">View Tasks</Link>
      </Button>
    </div>
  );
};

export default Projects;
