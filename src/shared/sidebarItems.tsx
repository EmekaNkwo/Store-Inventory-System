import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { FaUsers } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';

import { Routes } from './models';

export const sidebarItems: ItemType<MenuItemType>[] = [
  {
    label: 'Analytics',
    key: Routes.DASHBOARD,
    icon: <MdSpaceDashboard size={20} />,
  },
  {
    label: 'Products',
    key: Routes.INVENTORY,
    icon: <IoCart size={20} />,
  },
  {
    label: 'Staffs',
    key: Routes.STAFFS,
    icon: <FaUsers size={20} />,
  },
  // {
  //   label: 'Orders',
  //   key: '/orders',
  //   icon: <FaTags size={20} />,
  // },
];
