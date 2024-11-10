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
import { Button, Divider, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { createBonuses } from "../../shared/api/bonus";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import {
  createInstallmentPlan,
  getBankOffer,
  getInstallmentPlan,
} from "../../shared/api/installmentplan";

export const Transaction: React.FC<{
  data: ITransaction[];
  bonuses: any;
  handleGetBonuses: any;
}> = ({ data, bonuses, handleGetBonuses }) => {
  const token = useAppSelector(selectToken);
  const [openBonuses, setOpenBonuses] = useState("");
  const [openInstallment, setOpenInstallment] = useState("");
  const [mainData, setMainData] = useState<any>({
    amount: "",
    catalogId: "",
  });
  const [bonus, setBonus] = useState(0);
  const [installments, setInstallments] = useState<any>([]);
  const [iData, setI] = useState<any>([]);

  const handleSendBonuses = (id: string) => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const body = {
        accountId: data[0].accountId,
        catalogId: mainData.catalogId,
        transactionId: 11, // Mocked: id (not guid requires)
        amount: Number(mainData.amount),
      };

      createBonuses(process.env.REACT_APP_BACKEND_URL, body, token);
      handleGetBonuses();
    }
  };

  useEffect(() => {
    if (mainData.catalogId !== "" && mainData.amount !== "") {
      const conversation =
        mainData.catalogId !== "" && mainData.catalogId !== ""
          ? bonuses?.programDetail?.catalogs.filter(
              (catalog: any) => catalog.catalogId === mainData.catalogId
            )[0].conversionRate
          : 0;
      setBonus(conversation * Number(mainData.amount));
    }
  }, [mainData]);

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const handleSaveI = (data: any) => {
        setI(data.data);
      };

      getInstallmentPlan(process.env.REACT_APP_BACKEND_URL, token, handleSaveI);
    }
  }, [token]);

  return (
    <>
      {data.map((item) => {
        const formattedDate = format(item.valueDateTime, "d MMMM", {
          locale: ru,
        });

        return (
          <div key={item.transactionId}>
            <TransactionField>
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
                {item.creditDebitIndicator === 1 && (
                  <Button
                    onClick={() => {
                      setOpenBonuses(item.transactionId);
                    }}
                  >
                    Потратить бонусы
                  </Button>
                )}
                {item.creditDebitIndicator === 1 &&
                  iData.filter(
                    (itemI: any) => itemI.transactionId === item.transactionId
                  ).length === 0 && (
                    <Button
                      onClick={() => {
                        if (process.env.REACT_APP_BACKEND_URL && token) {
                          const handleSaveBank = (data: any) => {
                            setInstallments([
                              ...installments,
                              { [item.transactionId]: data.data },
                            ]);
                          };

                          setOpenInstallment(item.transactionId);
                          getBankOffer(
                            process.env.REACT_APP_BACKEND_URL,
                            token,
                            handleSaveBank,
                            item.amount.amount,
                            String(item.amount.currency)
                          );
                        }
                      }}
                    >
                      Взять в рассрочку
                    </Button>
                  )}
                {iData.filter(
                  (itemI: any) => itemI.transactionId === item.transactionId
                ).length !== 0 && (
                  <span>
                    {" "}
                    Рассрочка{"   "}
                    {
                      iData.filter(
                        (itemI: any) =>
                          itemI.transactionId === item.transactionId
                      )[0].remainingMonths
                    }{" "}
                    /{" "}
                    {
                      iData.filter(
                        (itemI: any) =>
                          itemI.transactionId === item.transactionId
                      )[0].quantityMonths
                    }{" "}
                    месяцев
                  </span>
                )}
              </Amount>

              <span
                style={
                  item.creditDebitIndicator === 2 ? { color: "#1677ff" } : {}
                }
              >
                {item.creditDebitIndicator === 2 ? "+ " : "- "}
                {formatCurrency(Number(item.amount.amount))}{" "}
                {CURRENCY_ICONS[String(item.amount.currency)]}
              </span>
            </TransactionField>

            {openInstallment === item.transactionId && (
              <div>
                <Divider />
                {installments.filter(
                  (instItem: any) =>
                    Object.keys(instItem)[0] === item.transactionId
                ).length > 0 &&
                  installments
                    .filter(
                      (instItem: any) =>
                        Object.keys(instItem)[0] === item.transactionId
                    )[0]
                    [item.transactionId].map((itemBank: any) => (
                      <div key={itemBank.id}>
                        <br />
                        {itemBank.bankName}, {itemBank.quantityMonths}{" "}
                        месяц(ец/а)
                        <br />
                        <Button
                          onClick={() => {
                            if (process.env.REACT_APP_BACKEND_URL && token) {
                              createInstallmentPlan(
                                process.env.REACT_APP_BACKEND_URL,
                                token,
                                itemBank.id,
                                item.transactionId
                              );
                              setOpenInstallment("");
                              window.location.reload();
                            }
                          }}
                        >
                          Оформить в рассрочку
                        </Button>
                      </div>
                    ))}
              </div>
            )}

            {openBonuses === item.transactionId && (
              <div>
                <Divider />

                <h2>Спишется: {bonus}</h2>
                <br />
                <InputNumber
                  placeholder="Сумма"
                  value={Number(mainData.amount)}
                  min={0}
                  style={{ width: 300 }}
                  onChange={(value) => {
                    const updatedNewItem = { ...mainData };
                    updatedNewItem.amount = String(value);

                    setMainData(updatedNewItem);
                  }}
                />
                <br />
                <br />
                <Select
                  placeholder="Карта"
                  options={bonuses.programDetail.catalogs.map((item: any) => {
                    return {
                      value: item.catalogId,
                      label:
                        item.conversionRate * 100 + "%, " + item.description,
                    };
                  })}
                  value={mainData.catalogId}
                  style={{ width: 300 }}
                  onChange={(value) => {
                    const updatedData = { ...mainData };

                    updatedData.catalogId = value;

                    setMainData(updatedData);
                  }}
                />
                <br />
                <br />
                <Button
                  onClick={() => {
                    handleSendBonuses(item.transactionId);
                    window.location.reload();
                  }}
                >
                  Списать
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
