'use client';
import React, { useEffect } from 'react';

import {
  CustomModal,
  FilledButton,
  PhoneInputField,
  SelectInput,
  TextInput,
} from '@/shared/UIs/ReusableComponent';
import { ModalProps } from '@/shared/models';

import { useStaffStore } from '../useStaffStore';
import useAddStaff from './useAddStaff';

const AddStaffModal = ({ openModal, setOpenModal }: ModalProps) => {
  const {
    addStaffState,
    setAddStaffState,
    handleAddStaff,
    handleUpdateStaff,
    isAddingStaff,
    addSuccess,
    editStaffState,
    updateSuccess,
    setEditStaffState,
    isUpdatingStaff,
  } = useAddStaff();

  useEffect(() => {
    if (addSuccess || updateSuccess) {
      setOpenModal(false);
    }
  }, [addSuccess, updateSuccess]);

  const { isEditStaff } = useStaffStore((state) => state);

  const isButtonDisabled = () => {
    return isEditStaff
      ? !editStaffState.name ||
          !editStaffState.email ||
          !editStaffState.phoneNumber ||
          !editStaffState.role
      : !addStaffState.name ||
          !addStaffState.email ||
          !addStaffState.phoneNumber ||
          !addStaffState.role;
  };

  return (
    <>
      <CustomModal
        title={isEditStaff ? 'Edit Staff' : 'Add Staff'}
        centered
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <hr />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-4 my-[1.5rem]">
            <TextInput
              title="Name"
              value={isEditStaff ? editStaffState.name : addStaffState.name}
              onChange={(e) =>
                isEditStaff
                  ? setEditStaffState({
                      ...editStaffState,
                      name: e.target.value,
                    })
                  : setAddStaffState({
                      ...addStaffState,
                      name: e.target.value,
                    })
              }
            />
            <TextInput
              title="Email"
              value={isEditStaff ? editStaffState.email : addStaffState.email}
              onChange={(e) =>
                isEditStaff
                  ? setEditStaffState({
                      ...editStaffState,
                      email: e.target.value,
                    })
                  : setAddStaffState({
                      ...addStaffState,
                      email: e.target.value,
                    })
              }
            />
            <PhoneInputField
              title="Phone Number"
              country={'ng'}
              value={
                isEditStaff
                  ? editStaffState.phoneNumber
                  : addStaffState.phoneNumber
              }
              onChange={(value) => {
                isEditStaff
                  ? setEditStaffState({
                      ...editStaffState,
                      phoneNumber: value,
                    })
                  : setAddStaffState({
                      ...addStaffState,
                      phoneNumber: value,
                    });
              }}
              autocompleteSearch
            />
            <SelectInput
              title="Role"
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'MANAGER', label: 'Manager' },
                { value: 'STAFF', label: 'Staff' },
              ]}
              value={isEditStaff ? editStaffState.role : addStaffState.role}
              onChange={(value) => {
                isEditStaff
                  ? setEditStaffState({ ...editStaffState, role: value })
                  : setAddStaffState({ ...addStaffState, role: value });
              }}
            />
          </div>
          <FilledButton
            title="Create staff"
            loading={isAddingStaff || isUpdatingStaff}
            disabled={isButtonDisabled()}
            onClick={() => {
              isEditStaff ? handleUpdateStaff() : handleAddStaff();
            }}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default React.memo(AddStaffModal);
