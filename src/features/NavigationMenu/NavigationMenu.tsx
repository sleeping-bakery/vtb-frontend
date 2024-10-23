import {
  ImageButton,
  ImageLogo,
  NavigationBlock,
} from "./NavigationMenu.styled";
import vtblogo from "../../shared/assets/vtblogo.jpg";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

export const NavigationMenu = () => {
  return (
    <NavigationBlock>
      <Link to="/">
        <ImageLogo src={vtblogo} />
      </Link>

      <Link to="/settings">
        <ImageButton shape="circle" icon={<SettingsIcon />} />
      </Link>
    </NavigationBlock>
  );
};
