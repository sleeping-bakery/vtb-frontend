import { Checkbox, Modal } from "antd";
import { USER_SETTINGS_CONSENTS } from "../../shared/consts/consts";
import { SettingsCheckboxes } from "./Settings.styles";
import { useState } from "react";
import { ISettings } from "../../shared/consts/types";
import { useAppSelector } from "../../app/store/hooks";
import {
  selectId,
  selectLogin,
  selectToken,
} from "../../app/store/user/userSlice";
import { putUser } from "../../shared/api/auth";
import { selectConsentsIds } from "../../app/store/consent/consentSlice";

export const Settings: React.FC<ISettings> = ({ isOpen, confirm, cancel }) => {
  const token = useAppSelector(selectToken);
  const id = useAppSelector(selectId);
  const login = useAppSelector(selectLogin);

  const defaultIds = useAppSelector(selectConsentsIds);
  const [requestIds, setRequestIds] = useState<number[]>([]);
  const [isClicked, setIsClicked] = useState(false);

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

  const handleCanelModal = () => {
    setRequestIds([]);
    setIsClicked(false);
    cancel();
  };

  const handleCheckboxClicked = (consentId: number) => {
    const handledIds = isClicked === false ? defaultIds : requestIds;

    if (isClicked === false) {
      setIsClicked(true);

      setRequestIds(defaultIds);
    }

    if (handledIds.includes(consentId)) {
      if (consentId === 1) {
        setRequestIds([]);
      } else if (consentId === 4) {
        setRequestIds([...handledIds.filter((id) => id < 4)]);
      } else {
        setRequestIds([...handledIds.filter((id) => id !== consentId)]);
      }
    } else {
      const idsToAdd = [consentId];

      if (consentId > 1 && !handledIds.includes(1)) {
        idsToAdd.push(1);
      }
      if (consentId > 4 && !handledIds.includes(4)) {
        idsToAdd.push(4);
      }

      setRequestIds([...handledIds, ...idsToAdd]);
    }
  };

  return (
    <Modal
      title="Настройки пользователя"
      open={isOpen}
      onOk={handleOkModal}
      onCancel={handleCanelModal}
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
              isClicked
                ? requestIds.includes(item.idToRequest)
                : defaultIds.includes(item.idToRequest)
            }
          >
            {item.name}
          </Checkbox>
        ))}
      </SettingsCheckboxes>
    </Modal>
  );
};
