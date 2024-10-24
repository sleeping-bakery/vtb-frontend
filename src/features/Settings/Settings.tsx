import { Checkbox, Modal } from "antd";
import { USER_SETTINGS_CONSENTS } from "../../shared/consts/consts";
import { SettingsCheckboxes } from "./Settings.styles";
import { useState } from "react";
import { IConsentSlice, ISettings } from "../../shared/consts/types";
import { useAppSelector } from "../../app/store/hooks";
import {
  selectId,
  selectLogin,
  selectToken,
} from "../../app/store/user/userSlice";
import { putUser } from "../../shared/api/auth";
import { selectConsents } from "../../app/store/consent/consentSlice";

export const Settings: React.FC<ISettings> = ({ isOpen, confirm, cancel }) => {
  const [requestIds, setRequestIds] = useState<number[]>([]);
  const token = useAppSelector(selectToken);
  const id = useAppSelector(selectId);
  const login = useAppSelector(selectLogin);
  const consents = useAppSelector(selectConsents);

  const handleCheckboxClicked = (consentId: number) => {
    if (requestIds.includes(consentId)) {
      setRequestIds([...requestIds.filter((id) => id !== consentId)]);
    } else {
      setRequestIds([...requestIds, consentId]);
    }
  };

  const handleOkModal = () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      putUser(process.env.REACT_APP_BACKEND_URL, token, {
        id,
        login,
        accountConsents: requestIds,
      });
    }

    confirm();
  };

  return (
    <Modal
      title="Настройки пользователя"
      open={isOpen}
      onOk={handleOkModal}
      onCancel={cancel}
      cancelText="Отменить"
      okText="Готово"
      centered
    >
      <SettingsCheckboxes>
        {USER_SETTINGS_CONSENTS.map((item) => (
          <Checkbox
            key={item.id}
            onClick={() => {
              handleCheckboxClicked(item.idToRequest);
            }}
            checked={
              consents[
                String(item.id).replace(
                  "R",
                  "r"
                ) as unknown as keyof IConsentSlice
              ]
            }
          >
            {item.name}
          </Checkbox>
        ))}
      </SettingsCheckboxes>
    </Modal>
  );
};
