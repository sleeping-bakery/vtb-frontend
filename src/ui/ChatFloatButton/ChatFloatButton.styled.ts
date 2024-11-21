import { styled } from "@mui/system";
import { Button } from "antd";

export const ChatButton = styled(Button)`
  position: fixed;
  bottom: 20px; /* Расстояние от нижнего края */
  right: 20px; /* Расстояние от правого края */
  z-index: 1000; /* Убедитесь, что кнопка всегда сверху других элементов */
`;

export const ChatModal = styled("div")`
  background: white;
  z-index: 1110;

  position: fixed;

  bottom: 10px;
  right: 10px;

  border-radius: 10px;

  svg {
    border-radius: 10px;
  }
`;

export const ChatBack = styled("div")`
  position: fixed;
  z-index: 1000;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
