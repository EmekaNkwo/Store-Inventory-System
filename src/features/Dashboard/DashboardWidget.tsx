import React from 'react';

const DashboardWidget = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-6 rounded-md bg-white shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium">{title}</h3>
        <span className="text-[20px] font-semibold">{value}</span>
      </div>
      {icon}
    </div>
  );
};

export default DashboardWidget;
