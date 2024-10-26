import { Modal } from "antd";

interface AccountsModalProps {
  isOpen: boolean;
}

export const AccountsModal: React.FC<AccountsModalProps> = ({ isOpen }) => {
  return (
    <Modal
      title="Просмотр cчёта"
      open={isOpen}
      // onOk={handleOkModal}
      // onCancel={handleCanelModal}
      cancelText="Отменить"
      okText="Готово"
      centered
    ></Modal>
  );
};
