'use client';

import React from 'react';
import { Layout } from 'antd';

import Sidebar from '@/features/Sidebar';
import Topbar from '@/features/Topbar';

const { Sider, Content } = Layout;

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>
        <Topbar />
        <Layout>
          <Sider width={250}>
            <Sidebar />
          </Sider>
          <Layout>
            <Content>
              <div className='p-3'>{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Template;
