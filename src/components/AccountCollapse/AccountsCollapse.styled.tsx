import { styled } from "@mui/system";
import { Button } from "antd";

export const LabelField = styled("div")`
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
    align-self: center;
  }
`;

export const ExtraButton = styled(Button)`
  margin-right: 10px;

  .ant-btn-icon {
    display: flex;
  }

  svg {
    align-self: center;
  }
`;
