'use client';
import React from 'react';
import { Popconfirm, Space, TableProps, Tag } from 'antd';

import { useProductStore } from '@/features/Products/useProductStore';
import { TextHeader } from '@/shared/UIs/CustomTexts';
import { Product } from '@/shared/models';
import {
  CustomTable,
  FilledButton,
  OutlinedButton,
} from '@/shared/UIs/ReusableComponent';

import { useProducts } from '../Products/useProducts';
import AddProductModal from '../Products/AddProduct/AddProductModal';

const Inventory = () => {
  const {
    isLoading,
    openModal,
    setOpenModal,
    handleDeleteProduct,
    isDeletingProduct,
  } = useProducts();
  const { products, setProduct, setIsEditProduct } = useProductStore(
    (state) => state
  );

  const handleClearProduct = () => {
    setProduct(null);
    setIsEditProduct(false);
  };
  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Type',
      render: (record) => {
        return (
          <span>
            {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
          </span>
        );
      },
      key: 'type',
    },
    {
      title: 'Variant',
      render: (record) => {
        return <span>{record.variant.toUpperCase()}</span>;
      },
      key: 'variant',
    },
    {
      title: 'Status',
      render: (record) => {
        return (
          <Tag
            color={
              record.status === 'ACTIVE'
                ? 'green'
                : record.status === 'INACTIVE'
                  ? 'blue'
                  : record.status === 'OUT_OF_STOCK'
                    ? 'orange'
                    : 'red'
            }
          >
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
              setIsEditProduct(true);
              setProduct(record);
              setOpenModal(true);
            }}
          />

          <Popconfirm
            placement="top"
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteProduct(record.id);
            }}
            okButtonProps={{ loading: isDeletingProduct }}
            onCancel={() => {
              console.log('Cancel');
            }}
          >
            <OutlinedButton loading={isDeletingProduct} danger title="Delete" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      {openModal && (
        <AddProductModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <div className="flex flex-col gap-3">
        <TextHeader text="Inventory" />
        <div className="flex justify-end">
          <FilledButton
            onClick={() => {
              handleClearProduct();
              setOpenModal(true);
            }}
            size="middle"
            title="Add Product"
          />
        </div>
        <CustomTable
          columns={columns}
          dataSource={products}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 20 }}
        />
      </div>
    </>
  );
};
export default Inventory;
