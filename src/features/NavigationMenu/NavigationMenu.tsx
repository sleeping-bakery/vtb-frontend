import {
  ExitButton,
  ImageButton,
  ImageLogo,
  MenuDropdown,
  NavigationBlock,
  NavigationMenuSubBlock,
} from "./NavigationMenu.styled";
import vtblogo from "../../shared/assets/vtblogo.jpg";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Settings } from "../Settings/Settings";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";

interface INavigationMenu {
  onLogout: () => void;
}

const items: MenuProps["items"] = [
  {
    key: "1_navigation",
    label: <Link to="accounts">Счета</Link>,
  },
  {
    key: "2_navigation",
    label: <Link to="period-payments">Периодические платежи</Link>,
  },
  {
    key: "3_navigation",
    label: <Link to="unidentified-payment">Неидентефицированный платеж</Link>,
  },
];

export const NavigationMenu: React.FC<INavigationMenu> = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <NavigationBlock>
      <MenuDropdown>
        <Link to="/">
          <ImageLogo src={vtblogo} />
        </Link>
        <Dropdown menu={{ items }} placement="bottom">
          <Button>Меню</Button>
        </Dropdown>
      </MenuDropdown>

      <NavigationMenuSubBlock>
        <ImageButton
          shape="circle"
          onClick={showModal}
          icon={<SettingsIcon />}
        />

        <ExitButton onClick={onLogout} icon={<LogoutIcon />} />
      </NavigationMenuSubBlock>

      <Settings isOpen={isModalOpen} confirm={handleOk} cancel={handleCancel} />
    </NavigationBlock>
  );
};
