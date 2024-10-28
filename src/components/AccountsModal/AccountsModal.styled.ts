import { styled } from "@mui/system";
import { Modal } from "antd";
import { COLORS } from "../../shared/consts/consts";

export const AccountsModalStyled = styled(Modal)`
  width: 1000px !important;

  .ant-modal-title {
    font-size: 36px;
  }

  section {
    margin-top: 20px;
  }

  p {
    font-size: 16px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 22px;
    font-style: normal;
  }
`;

export const TextSwitchBlock = styled("div")`
  display: flex;
`;

export const TextSwitchButton = styled("button")`
  color: grey;
  cursor: pointer;

  background: inherit;
  border: 0;

  margin-right: 10px;

  :hover {
    color: ${COLORS.TEXT_MAIN};
  }
`;
