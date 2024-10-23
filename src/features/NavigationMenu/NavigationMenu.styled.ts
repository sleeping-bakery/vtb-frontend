import { styled } from "@mui/system";
import { COLORS } from "../../shared/consts/consts";
import { Button } from "antd";

export const NavigationBlock = styled("div")`
  width: 100%;
  background: ${COLORS.MAIN};

  margin-top: 10px;

  height: 40px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ImageLogo = styled("img")`
  position: absolute;
  top: 0;
  left: 10px;

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
    fill: ${COLORS.PRIMARY_BLUE};
    align-self: center;
  }
`;
