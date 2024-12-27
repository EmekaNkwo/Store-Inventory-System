import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { FaTags, FaUsers } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';

export const sidebarItems: ItemType<MenuItemType>[] = [
  {
    label: 'Analytics',
    key: '/dashboard',
    icon: <MdSpaceDashboard size={20} />,
  },
  {
    label: 'Inventory',
    key: '/inventory',
    icon: <IoCart size={20} />,
  },
  {
    label: 'Staffs',
    key: '/staffs',
    icon: <FaUsers size={20} />,
  },
  {
    label: 'Orders',
    key: '/orders',
    icon: <FaTags size={20} />,
  },
];
