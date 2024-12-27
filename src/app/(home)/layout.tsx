'use client';

import React from 'react';
import { Layout } from 'antd';

import Sidebar from '@/features/Sidebar';
import Topbar from '@/features/Topbar';
import { useFeatureStore } from '@/features/useFeatureStore';

const { Sider, Content } = Layout;

const Template = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useFeatureStore();
  return (
    <>
      <Layout>
        <Topbar />
        <Layout>
          <Sider width={isCollapsed ? 0 : 250}>
            <Sidebar />
          </Sider>
          <Layout>
            <Content>
              <div className="p-3 bg-slate-50 min-h-[calc(100vh-64px)] overflow-y-auto">
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Template;
