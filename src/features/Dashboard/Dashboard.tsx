'use client';

import {
  MdOutlineAddShoppingCart,
  MdOutlineShoppingCart,
  MdShoppingCartCheckout,
} from 'react-icons/md';
import { BsCartDash, BsCartX } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { LuUserRoundMinus, LuUserRoundPlus } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

import { SubTextHeader } from '@/shared/UIs/CustomTexts';
import { OutlinedButton } from '@/shared/UIs/ReusableComponent';
import { Routes } from '@/shared/models';
import DashboardWidgetSkeleton from '@/shared/UIs/SkeletalLoading';

import StaffTable from '../Staffs/StaffTable';
import Inventory from '../Inventory/Inventory';
import useDashboard from './useDashboard';
import DashboardWidget from './DashboardWidget';

const Dashboard = () => {
  const router = useRouter();

  const { dashboardData, isLoading } = useDashboard();

  const dashboardWidgets = [
    {
      title: 'Total Staffs',
      value: dashboardData?.staffs.total || 0,
      icon: FiUsers,
      color: { text: '#3B82F6', bg: '#DBEAFE' },
    },
    {
      title: 'Active Staffs',
      value: dashboardData?.staffs.active || 0,
      icon: LuUserRoundPlus,
      color: { text: '#10B981', bg: '#D1FAE5' },
    },
    {
      title: 'Inactive Staffs',
      value: dashboardData?.staffs.inactive || 0,
      icon: LuUserRoundMinus,
      color: { text: '#EF4444', bg: '#FEE2E2' },
    },
    {
      title: 'Total Products',
      value: dashboardData?.products.total || 0,
      icon: MdOutlineShoppingCart,
      color: { text: '#8B5CF6', bg: '#EDE9FE' },
    },
    {
      title: 'Active Products',
      value: dashboardData?.products.active || 0,
      icon: MdOutlineAddShoppingCart,
      color: { text: '#22C55E', bg: '#DCFCE7' },
    },
    {
      title: 'Inactive Products',
      value: dashboardData?.products.inactive || 0,
      icon: MdShoppingCartCheckout,
      color: { text: '#F59E0B', bg: '#FEF3C7' },
    },
    {
      title: 'Out of Stock Products',
      value: dashboardData?.products.outOfStock || 0,
      icon: BsCartX,
      color: { text: '#F97316', bg: '#FFEDD5' },
    },
    {
      title: 'Discontinued Products',
      value: dashboardData?.products.discontinued || 0,
      icon: BsCartDash,
      color: { text: '#DC2626', bg: '#FEE2E2' },
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <DashboardWidgetSkeleton key={index} />)
          : dashboardWidgets.map((widget, index) => (
              <DashboardWidget
                key={index}
                title={widget.title}
                value={widget.value}
                icon={
                  <widget.icon
                    size={28}
                    style={{
                      color: widget.color.text,
                      backgroundColor: widget.color.bg,
                    }}
                    className="w-[40px] h-[40px] p-[0.4rem] rounded-full"
                  />
                }
              />
            ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <SubTextHeader text="Products" />
            <OutlinedButton
              title="View more"
              onClick={() => {
                router.push(Routes.INVENTORY);
              }}
            />
          </div>
          <Inventory isDashboardView />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <SubTextHeader text="Staffs" />
            <OutlinedButton
              title="View more"
              onClick={() => {
                router.push(Routes.STAFFS);
              }}
            />
          </div>
          <StaffTable isDashboardView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
