import React from 'react';
import { Button, Tabs, Table, Empty } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

interface Program {
  key: string;
  title: string;
  description: string;
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <a>Delete</a>, 
  },
];

const data: Program[] = [
  { key: '1', title: 'Program A', description: 'Description for Program A' },
  { key: '2', title: 'Program B', description: 'Description for Program B' },
  { key: '3', title: 'Program C', description: 'Description for Program C' },
];

const Programs: React.FC = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
      <h1>Programs</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
          {data.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <Empty description="No programs" />}
        </TabPane>
        <TabPane tab="Archived" key="2">
          <Empty description="No archived programs" />
        </TabPane>
      </Tabs>
      <Button type="primary" style={{ marginTop: '16px' }}>
        <Link to="/create-program">Create Program</Link>
      </Button>
    </div>
  );
};

export default Programs;
