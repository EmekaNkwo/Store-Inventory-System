import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className='h-screen bg-[#fff] text-black shadow-sm'>
      <div className='flex flex-col gap-3 p-3'>
        <Link href='/dashboard'>Analytics</Link>
        <Link href='/inventory'>Inventory</Link>
        <Link href='/staffs'>Staffs</Link>
        <Link href='/orders'>Orders</Link>
      </div>
    </div>
  );
};

export default Sidebar;
