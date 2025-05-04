import { format } from "date-fns";
import {
  Statement as IStatement,
  Transaction as ITransaction,
} from "../../shared/consts/types";
import { Transaction } from "../Transaction/Transaction";

export const Statement: React.FC<{
  data: IStatement[];
  transactionData: ITransaction[];
  bonuses: any;
  handleGetBonuses: any;
}> = ({ data, transactionData, bonuses, handleGetBonuses }) => {
  return (
    <div style={{ marginTop: "8px" }}>
      <span style={{ paddingBottom: "20px" }}>
        Дата создания {format(data[0].creationDateTime, "dd.MM.yyyy hh:mm")}
        <br />
        Бронирование с{" "}
        {format(data[0].fromBookingDateTime, "dd.MM.yyyy hh:mm ")}
        по
        {format(data[0].toBookingDateTime, " dd.MM.yyyy hh:mm")}
      </span>
      <br />
      <Transaction
        data={transactionData}
        bonuses={bonuses}
        handleGetBonuses={handleGetBonuses}
      />
    </div>
  );
};
