'use client';
import React, { useEffect } from 'react';

import {
  CustomModal,
  FilledButton,
  SelectInput,
  TextInput,
} from '@/shared/UIs/ReusableComponent';
import { ModalProps, ProductStatus } from '@/shared/models';
import { numberRegex } from '@/shared/regex';
import { useProductStore } from '@/features/Products/useProductStore';

import useAddProduct from './useAddProduct';

const AddProductModal = ({ openModal, setOpenModal }: ModalProps) => {
  const {
    addProductState,
    setAddProductState,
    handleAddProduct,
    handleUpdateProduct,
    isAddingProduct,
    addSuccess,
    editProductState,
    updateSuccess,
    setEditProductState,
    isUpdatingProduct,
  } = useAddProduct();

  useEffect(() => {
    if (addSuccess || updateSuccess) {
      setOpenModal(false);
    }
  }, [addSuccess, updateSuccess]);

  const { isEditProduct } = useProductStore((state) => state);

  const isButtonDisabled = () => {
    return isEditProduct
      ? !editProductState.name ||
          !editProductState.quantity ||
          !editProductState.price ||
          !editProductState.type ||
          !editProductState.status ||
          !editProductState.variant
      : !addProductState.name ||
          !addProductState.quantity ||
          !addProductState.price ||
          !addProductState.type ||
          !addProductState.status ||
          !addProductState.variant;
  };
  return (
    <>
      <CustomModal
        title={isEditProduct ? 'Edit Product' : 'Add Product'}
        centered
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <hr />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4 my-[1.5rem]">
            <TextInput
              title="Name"
              value={
                isEditProduct ? editProductState.name : addProductState.name
              }
              onChange={(e) =>
                isEditProduct
                  ? setEditProductState({
                      ...editProductState,
                      name: e.target.value,
                    })
                  : setAddProductState({
                      ...addProductState,
                      name: e.target.value,
                    })
              }
            />
            <TextInput
              title="Quantity"
              value={
                isEditProduct
                  ? editProductState.quantity
                  : addProductState.quantity
              }
              onChange={(e) => {
                // Allow empty string or numbers
                if (e.target.value === '' || numberRegex.test(e.target.value)) {
                  isEditProduct
                    ? setEditProductState({
                        ...editProductState,
                        quantity: e.target.value,
                      })
                    : setAddProductState({
                        ...addProductState,
                        quantity: e.target.value,
                      });
                }
              }}
            />
            <TextInput
              title="Price"
              value={
                isEditProduct ? editProductState.price : addProductState.price
              }
              onChange={(e) => {
                // Allow empty string or numbers
                if (e.target.value === '' || numberRegex.test(e.target.value)) {
                  isEditProduct
                    ? setEditProductState({
                        ...editProductState,
                        price: e.target.value,
                      })
                    : setAddProductState({
                        ...addProductState,
                        price: e.target.value,
                      });
                }
              }}
            />
            <SelectInput
              title="Type"
              options={[
                { value: 'grocery', label: 'Grocery' },
                { value: 'fashion', label: 'Fashion' },
                { value: 'electronics', label: 'Electronics' },
              ]}
              value={
                isEditProduct ? editProductState.type : addProductState.type
              }
              onChange={(value) => {
                isEditProduct
                  ? setEditProductState({ ...editProductState, type: value })
                  : setAddProductState({ ...addProductState, type: value });
              }}
            />
            <SelectInput
              title="Status"
              options={Object.values(ProductStatus).map((status) => ({
                value: status,
                label: status,
              }))}
              value={
                isEditProduct ? editProductState.status : addProductState.status
              }
              onChange={(value) => {
                isEditProduct
                  ? setEditProductState({ ...editProductState, status: value })
                  : setAddProductState({ ...addProductState, status: value });
              }}
            />
            <SelectInput
              title="Variant"
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ]}
              value={
                isEditProduct
                  ? editProductState.variant
                  : addProductState.variant
              }
              onChange={(value) => {
                isEditProduct
                  ? setEditProductState({ ...editProductState, variant: value })
                  : setAddProductState({ ...addProductState, variant: value });
              }}
            />
          </div>
          <FilledButton
            title="Create product"
            loading={isAddingProduct || isUpdatingProduct}
            disabled={isButtonDisabled()}
            onClick={() => {
              isEditProduct ? handleUpdateProduct() : handleAddProduct();
            }}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default React.memo(AddProductModal);
