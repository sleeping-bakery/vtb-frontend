import { useEffect, useState } from "react";
import { InstallmentPlanListField } from "./InstallmentPlanList.styled";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import {
  createInstallmentPlanPayment,
  getBankOffer,
  getInstallmentPlan,
} from "../../shared/api/installmentplan";
import { Button, Divider } from "antd";
import { getTransactions } from "../../shared/api/accounts";
import { CURRENCY_ICONS } from "../../shared/consts/icons";

export const InstallmentPlanList = () => {
  const token = useAppSelector(selectToken);

  const [data, setData] = useState<any>([]);
  const [installments, setInstallments] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const handleSaveData = (data: any) => {
        setData(data.data);
      };

      getInstallmentPlan(
        process.env.REACT_APP_BACKEND_URL,
        token,
        handleSaveData
      );
    }
  }, [token]);

  useEffect(() => {
    if (
      data.length > 0 &&
      process.env.REACT_APP_BACKEND_URL &&
      token &&
      installments.length === 0
    ) {
      const handleGetTrans = (trans: any) => {
        const mappedData = data.map((dataItem: any) => dataItem.transactionId);

        trans.data.transaction
          .filter((transItem: any) =>
            mappedData.includes(transItem.transactionId)
          )
          .forEach((transItem: any) => {
            const handleSaveBank = (data: any) => {
              setInstallments([
                ...installments,
                { [transItem.transactionId]: data.data },
              ]);

              setTransactions([
                ...transactions,
                { [transItem.transactionId]: transItem },
              ]);
            };

            if (process.env.REACT_APP_BACKEND_URL && token) {
              getBankOffer(
                process.env.REACT_APP_BACKEND_URL,
                token,
                handleSaveBank,
                transItem.amount.amount,
                String(transItem.amount.currency)
              );
            }
          });
      };

      getTransactions(process.env.REACT_APP_BACKEND_URL, token, handleGetTrans);
    }
  }, [data]);

  return (
    <InstallmentPlanListField>
      {data.map((dataItem: any) => {
        const iData = installments.filter(
          (iItem: any) => Object.keys(iItem)[0] === dataItem.transactionId
        );
        const tData = transactions.filter(
          (tItem: any) => Object.keys(tItem)[0] === dataItem.transactionId
        );
        console.log(tData);

        let bankInfo;
        let transInfo = 0;
        let transCurr;

        if (iData[0]) {
          bankInfo = iData[0][dataItem.transactionId].filter(
            (dataItemTrans: any) => dataItemTrans.id === dataItem.bankOfferId
          )[0];
        }

        if (tData[0] && tData[0][dataItem.transactionId]) {
          transInfo = tData[0][dataItem.transactionId].amount.amount;
          transCurr = tData[0][dataItem.transactionId].amount.currency;
        }

        const currentNumber = dataItem.quantityMonths - dataItem.quantityMonths;

        return (
          <div key={dataItem.id}>
            <Divider />
            {bankInfo?.bankName}, {transInfo} {CURRENCY_ICONS[transCurr]},
            осталось месяцев {dataItem.quantityMonths}, всего месяцев{" "}
            {dataItem.quantityMonths}
            <br />
            <br />
            <div style={{ display: "flex" }}>
              {Array(dataItem.quantityMonths)
                .fill(0)
                .map((ia, index) => (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2,
                      background:
                        currentNumber === index
                          ? "blue"
                          : currentNumber > index
                          ? "green"
                          : "black",
                      borderRadius: 100,
                    }}
                    key={"circle_" + index + "_" + data.id}
                  ></div>
                ))}
            </div>
            <br />
            <br />
            <Button
              onClick={() => {
                if (process.env.REACT_APP_BACKEND_URL && token) {
                  createInstallmentPlanPayment(
                    process.env.REACT_APP_BACKEND_URL,
                    token,
                    dataItem.id
                  );
                }
              }}
            >
              Оплатить
            </Button>
            <Divider />
          </div>
        );
      })}
    </InstallmentPlanListField>
  );
};
