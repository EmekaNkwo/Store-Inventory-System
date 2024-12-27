import React from 'react';
import { FaBars } from 'react-icons/fa';

import { useFeatureStore } from './useFeatureStore';

const Topbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setIsCollapsed } = useFeatureStore((store) => store);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsCollapsed(!isOpen);
  };
  return (
    <div className="bg-[#fff] w-full h-16 shadow-md border-b-2 p-4">
      <div className="flex items-center gap-3">
        <h1 className="text-[20px] font-bold">Inventory System</h1>
        <FaBars size={18} onClick={toggleMenu} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Topbar;
