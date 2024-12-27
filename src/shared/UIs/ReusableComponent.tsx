import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  Modal,
  ModalProps,
  Select,
  SelectProps,
  Table,
} from 'antd';
import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

interface IModalProps extends ModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: (_value: boolean) => void;
  children: React.ReactNode;
}

interface IInputProps extends InputProps {
  title?: string;
}

interface IButtonProps extends ButtonProps {
  title: string;
}

interface ISelectProps extends SelectProps {
  title?: string;
}

interface IPhoneNumberProps extends PhoneInputProps {
  title?: string;
}

export const CustomModal = ({
  title,
  openModal,
  setOpenModal,
  children,
  ...props
}: IModalProps) => {
  return (
    <Modal
      title={title}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      {...props}
    >
      {children}
    </Modal>
  );
};

export const CustomTable = ({ ...props }) => {
  return <Table {...props} bordered scroll={{ x: 'max-content' }} />;
};

export const TextInput = ({ title, ...props }: IInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && <label className="text-[15px] font-medium">{title}</label>}
      <Input size="large" {...props} />
    </div>
  );
};

export const OutlinedButton = ({ title, ...props }: IButtonProps) => {
  return (
    <Button variant="outlined" {...props}>
      {title}
    </Button>
  );
};

export const FilledButton = ({ title, ...props }: IButtonProps) => {
  return (
    <Button
      type="primary"
      size={props.size || 'large'}
      {...props}
      className={`border-none bg-blue-600  text-white font-medium ${props.className}`}
    >
      {title}
    </Button>
  );
};

export const SelectInput = ({ title, ...props }: ISelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && <label className="text-[15px] font-medium">{title}</label>}
      <Select size="large" {...props} />
    </div>
  );
};

export const PhoneInputField = ({ title, ...props }: IPhoneNumberProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {title && <label className="text-[15px] font-medium">{title}</label>}
      <PhoneInput
        {...props}
        inputStyle={{
          width: '100%',
          padding: '1.2rem 3rem',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          outline: 'none',
        }}
        autoFormat
        enableSearch
      />
    </div>
  );
};
