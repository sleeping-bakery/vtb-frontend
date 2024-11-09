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
    <div>
      Дата создания {data[0].creationDateTime}
      <br />
      Бронирование с {data[0].fromBookingDateTime} по{" "}
      {data[0].toBookingDateTime}
      <br />
      <Transaction
        data={transactionData}
        bonuses={bonuses}
        handleGetBonuses={handleGetBonuses}
      />
    </div>
  );
};
