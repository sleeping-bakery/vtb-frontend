import { styled } from "@mui/system";
import { Button } from "antd";

export const ChatButton = styled(Button)`
  position: fixed;
  bottom: 20px; /* Расстояние от нижнего края */
  right: 20px; /* Расстояние от правого края */
  z-index: 1000; /* Убедитесь, что кнопка всегда сверху других элементов */
`;
