'use client';
import React from 'react';
import { Popconfirm, Space, TableProps, Tag } from 'antd';

import { useStaffStore } from '@/features/Staffs/useStaffStore';
import { TextHeader } from '@/shared/UIs/CustomTexts';
import {
  CustomTable,
  FilledButton,
  OutlinedButton,
} from '@/shared/UIs/ReusableComponent';
import { Staff } from '@/shared/models';

import AddStaffModal from './AddStaff/AddStaffModal';
import { useStaff } from './useStaff';

const StaffTable = () => {
  const {
    isLoading,
    openModal,
    setOpenModal,
    handleActivateStaff,
    handleDeactivateStaff,
    isActivatingOrDeactivatingStaff,
    handleDownloadCSV,
  } = useStaff();
  const { staffs, setStaff, setIsEditStaff } = useStaffStore((state) => state);

  const handleClearStaff = () => {
    setStaff(null);
    setIsEditStaff(false);
  };
  const columns: TableProps<Staff>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      render: (record) => {
        return <span>+{record.phoneNumber}</span>;
      },
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      render: (record) => {
        return (
          <Tag color={record.status === 'ACTIVE' ? 'green' : 'red'}>
            {record.status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <OutlinedButton
            title="Edit"
            onClick={() => {
              setIsEditStaff(true);
              setStaff(record);
              setOpenModal(true);
            }}
          />

          {record.status === 'ACTIVE' ? (
            <Popconfirm
              title="Are you sure you want to deactivate this staff?"
              onConfirm={() => handleDeactivateStaff(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <OutlinedButton
                title="Deactivate"
                danger
                loading={isActivatingOrDeactivatingStaff}
                disabled={isActivatingOrDeactivatingStaff}
              />
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure you want to activate this staff?"
              onConfirm={() => handleActivateStaff(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <OutlinedButton
                title="Activate"
                loading={isActivatingOrDeactivatingStaff}
                disabled={isActivatingOrDeactivatingStaff}
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      {openModal && (
        <AddStaffModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <div className="flex flex-col gap-3">
        <TextHeader text="Staffs" />
        <div className="flex gap-2 justify-end">
          <OutlinedButton
            onClick={() => {
              handleDownloadCSV();
            }}
            size="middle"
            title="Download CSV"
          />
          <FilledButton
            onClick={() => {
              handleClearStaff();
              setOpenModal(true);
            }}
            size="middle"
            title="Add Staff"
          />
        </div>
        <CustomTable
          columns={columns}
          dataSource={staffs}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 20 }}
        />
      </div>
    </>
  );
};
export default StaffTable;
