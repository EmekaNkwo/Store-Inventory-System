import React from 'react';
import { Skeleton } from 'antd';

const DashboardWidgetSkeleton = () => {
  return (
    <div className="flex justify-between items-center px-4 py-6 rounded-md bg-white shadow-sm">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton.Input
          active
          size="small"
          style={{ width: '100px', marginBottom: '8px' }}
        />
        <Skeleton.Input active size="large" style={{ width: '150px' }} />
      </div>
      <Skeleton.Avatar active size={40} shape="circle" />
    </div>
  );
};

export const InventoryTableSkeleton = ({
  isDashboardView,
}: {
  isDashboardView?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {!isDashboardView && (
        <div className="w-1/3">
          <Skeleton.Input active size="large" style={{ width: '200px' }} />
        </div>
      )}

      {!isDashboardView && (
        <div className="flex justify-end mb-4">
          <Skeleton.Button active size="large" />
        </div>
      )}

      <div className="bg-white p-4 rounded-md flex flex-col gap-3">
        <Skeleton.Input active={true} size="large" block={true} />
        <Skeleton.Input active={true} size="large" block={true} />
        <Skeleton.Input active={true} size="large" block={true} />
        <Skeleton.Input active={true} size="large" block={true} />
        <Skeleton.Input active={true} size="large" block={true} />
      </div>
    </div>
  );
};

export default DashboardWidgetSkeleton;
