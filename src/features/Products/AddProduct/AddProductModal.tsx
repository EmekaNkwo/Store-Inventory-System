import React, { useEffect } from 'react';

import {
  CustomModal,
  FilledButton,
  SelectInput,
  TextInput,
} from '@/shared/UIs/ReusableComponent';
import { ModalProps, ProductStatus } from '@/shared/models';
import useAddProduct from './useAddProduct';
import { numberRegex } from '@/shared/regex';
import { useInventoryStore } from '@/store/useInventoryStore';

const AddProductModal = ({ openModal, setOpenModal }: ModalProps) => {
  const {
    addProductState,
    setAddProductState,
    handleAddProduct,
    isAddingProduct,
    addSuccess,
  } = useAddProduct();

  const { product } = useInventoryStore((state) => state);

  console.log(product);

  useEffect(() => {
    if (addSuccess) {
      setOpenModal(false);
    }
  }, [addSuccess]);
  return (
    <>
      <CustomModal
        title="Add Product"
        centered
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <hr />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4 my-[1.5rem]">
            <TextInput
              title="Name"
              value={addProductState.name}
              onChange={(e) =>
                setAddProductState({ ...addProductState, name: e.target.value })
              }
            />
            <TextInput
              title="Quantity"
              value={addProductState.quantity}
              onChange={(e) => {
                if (numberRegex.test(e.target.value)) {
                  setAddProductState({
                    ...addProductState,
                    quantity: e.target.value,
                  });
                }
              }}
            />
            <TextInput
              title="Price"
              value={addProductState.price}
              onChange={(e) => {
                if (numberRegex.test(e.target.value)) {
                  setAddProductState({
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
              value={addProductState.type}
              onChange={(value) => {
                setAddProductState({ ...addProductState, type: value });
              }}
            />
            <SelectInput
              title="Status"
              options={Object.values(ProductStatus).map((status) => ({
                value: status,
                label: status,
              }))}
              value={addProductState.status}
              onChange={(value) => {
                setAddProductState({ ...addProductState, status: value });
              }}
            />
            <SelectInput
              title="Variant"
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ]}
              value={addProductState.variant}
              onChange={(value) =>
                setAddProductState({ ...addProductState, variant: value })
              }
            />
          </div>
          <FilledButton
            title="Create product"
            loading={isAddingProduct}
            onClick={() => {
              handleAddProduct();
            }}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default AddProductModal;
