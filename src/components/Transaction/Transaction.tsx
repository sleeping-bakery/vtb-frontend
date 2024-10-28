import { Transaction as ITransaction } from "../../shared/consts/types";
import {
  Amount,
  TransactionField,
  TransactionLeftField,
} from "./Transaction.styled";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { CURRENCY_ICONS } from "../../shared/consts/icons";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export const Transaction: React.FC<{ data: ITransaction[] }> = ({ data }) => {
  return (
    <>
      {data.map((item) => {
        const formattedDate = format(item.valueDateTime, "d MMMM", {
          locale: ru,
        });

        return (
          <TransactionField key={item.transactionId}>
            <TransactionLeftField>
              <span className="icon">
                {item.creditDebitIndicator === 2 ? (
                  <KeyboardDoubleArrowRightIcon />
                ) : (
                  <KeyboardDoubleArrowLeftIcon />
                )}
              </span>
              <div>
                <span>
                  {item.creditorAccount.name}
                  {"   "}

                  <span style={{ fontSize: "18px" }}> •• </span>
                  {item.creditorAccount.identification.slice(-4)}
                </span>
                <div style={{ color: "grey" }}>
                  {item.transactionInformation} • {formattedDate}
                </div>
              </div>
            </TransactionLeftField>

            <Amount>
              <span
                style={
                  item.creditDebitIndicator === 2 ? { color: "#1677ff" } : {}
                }
              >
                {item.creditDebitIndicator === 2 ? "+ " : "- "}
                {formatCurrency(Number(item.amount.amount))}{" "}
                {CURRENCY_ICONS[String(item.amount.currency)]}
              </span>
            </Amount>
          </TransactionField>
        );
      })}
    </>
  );
};
