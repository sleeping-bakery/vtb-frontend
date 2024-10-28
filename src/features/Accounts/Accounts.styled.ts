import { styled } from "@mui/system";

export const AccountsPage = styled("section")`
  margin-top: 10px;

  .ant-collapse {
    border: 0;
    background: inherit;
  }

  .ant-collapse-extra {
    max-height: 16px;
  }

  .ant-collapse-item {
    background: #f5f5f5;
    border-radius: 8px !important;

    margin-top: 5px;
    margin-bottom: 5px;
    border: 0;
  }

  .ant-collapse-content-box {
    border: #d9d9d9 1px solid;
    border-top: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const AccountsContent = styled("div")`
  background: white;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 8px;

  padding-bottom: 30px;
`;

export const PageTitle = styled("h1")`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 34px;
`;
