import { styled } from "@mui/system";
import { COLORS } from "../../shared/consts/consts";
import { Button } from "antd";

export const NavigationBlock = styled("div")`
  width: 100%;
  background: ${COLORS.MAIN};

  margin-top: 10px;

  height: 70px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 30px;
`;

export const ImageLogo = styled("img")`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;

  height: 40px;
  width: 40px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
`;

export const ImageButton = styled(Button)`
  .ant-btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    fill: ${COLORS.TEXT_MAIN};
    align-self: center;
  }

  :hover {
    svg {
      fill: ${COLORS.PRIMARY_BLUE};
    }
  }

  transition: 0.15s;
`;

export const NavigationMenuSubBlock = styled("div")`
  display: flex;
`;

export const ExitButton = styled(Button)`
  margin-left: 10px;

  .ant-btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    fill: ${COLORS.TEXT_MAIN};
    align-self: center;
  }

  :hover {
    svg {
      fill: ${COLORS.PRIMARY_BLUE};
    }
  }

  transition: 0.15s;
`;

export const MenuDropdown = styled("div")`
  margin-left: 70px;
`;
