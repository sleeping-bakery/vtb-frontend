import { styled } from "@mui/system";
import { COLORS } from "../../shared/consts/consts";

export const TransactionField = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 10px;
  padding: 4px;

  background: #f5f5f5;
  border-radius: 8px;
  padding-right: 20px;
`;

export const TransactionLeftField = styled("div")`
  display: flex;
  align-items: center;

  .icon {
    margin-left: 10px;
    margin-right: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      fill: ${COLORS.PRIMARY_BLUE};
      self-align: center;
    }
  }
`;

export const Amount = styled("div")`
  font-size: 18px;
`;
