import { styled } from "@mui/system";
import { Checkbox, Modal } from "antd";

export const SettingsCheckboxes = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-size: 28px;
  }

  .ant-modal-footer {
    margin-top: 30px;
  }

  .ant-modal-footer button {
    font-size: 16px;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
