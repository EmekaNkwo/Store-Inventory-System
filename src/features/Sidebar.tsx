import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

import { sidebarItems } from '@/shared/sidebarItems';

import { useFeatureStore } from './useFeatureStore';

const { Sider } = Layout;

const Sidebar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const currentPath = useMemo(() => {
    return pathname;
  }, [pathname]);

  const { isCollapsed } = useFeatureStore((store) => store);

  const handleMenuClick = (key: string) => {
    push(key);
    setSelectedKeys([key]);
  };

  useEffect(() => {
    setSelectedKeys([currentPath]);
  }, [currentPath]);

  return (
    <Layout
      hasSider
      className="sticky top-0 min-h-[calc(100vh-64px)] bg-white z-10 overflow-y-auto"
    >
      <Sider
        collapsible
        collapsedWidth="0"
        trigger={null}
        collapsed={isCollapsed}
        width={250}
        className="bg-white z-10 overflow-y-auto"
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={sidebarItems}
          className="flex flex-col gap-4"
          onClick={({ key }) => {
            handleMenuClick(key);
          }}
        />
      </Sider>
    </Layout>
  );
};

export default React.memo(Sidebar);
