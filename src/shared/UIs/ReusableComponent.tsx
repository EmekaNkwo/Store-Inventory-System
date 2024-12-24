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
      size="large"
      {...props}
      className={`border-none bg-blue-600 text-white font-medium ${props.className}`}
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
