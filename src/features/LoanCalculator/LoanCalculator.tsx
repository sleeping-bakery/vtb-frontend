import { Button, Divider, InputNumber } from "antd";
import { LoanCalculatorField } from "./LoanCalculator.styled";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { getBanks, postCalculator } from "../../shared/api/loancalculator";
import { CURRENCY_ICONS } from "../../shared/consts/icons";

export const LoanCalculator = () => {
  const token = useAppSelector(selectToken);

  const [mainData, setMainData] = useState({
    loanAmount: 0,
    loanTermInYears: 0,
    selectedInterestRate: 0,
  });
  const [afterCalc, setAfterCalc] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
  });

  const [banks, setBanks] = useState<any>([]);

  useEffect(() => {
    const handleSaveBanks = (data: any) => {
      setBanks(data.data);
    };

    if (process.env.REACT_APP_BACKEND_URL && token) {
      getBanks(process.env.REACT_APP_BACKEND_URL, token, handleSaveBanks);
    }
  }, [token]);

  const handleCalculate = () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const handleSavePost = (data: any) => {
        setAfterCalc(data.data);
      };
      postCalculator(
        process.env.REACT_APP_BACKEND_URL,
        mainData,
        token,
        handleSavePost
      );
    }
  };

  return (
    <LoanCalculatorField>
      <br />
      <h2>Калькулятор ипотеки</h2>
      <br />
      <br />
      <InputNumber
        style={{ width: 300 }}
        placeholder="Сумма кредита"
        min={10000}
        onChange={(value) => {
          const updatedNewItem = { ...mainData };
          updatedNewItem.loanAmount = Number(value);

          setMainData(updatedNewItem);
        }}
      />
      <br />
      <br />
      <InputNumber
        style={{ width: 300 }}
        placeholder="Длительность кредита в годах"
        min={1}
        onChange={(value) => {
          const updatedNewItem = { ...mainData };
          updatedNewItem.loanTermInYears = Number(value);

          setMainData(updatedNewItem);
        }}
      />
      <br />
      <br />
      <span>Процентная ставка</span>{" "}
      <InputNumber
        style={{ width: 70 }}
        placeholder="Процентная ставка"
        min={0}
        value={mainData.selectedInterestRate}
        onChange={(value) => {
          const updatedNewItem = { ...mainData };
          updatedNewItem.selectedInterestRate = Number(value);

          setMainData(updatedNewItem);
        }}
      />
      <br />
      <br />
      <Button type="primary" onClick={handleCalculate}>
        Рассчитать
      </Button>
      <br />
      <br />
      <div>
        <span>Ежемесячная выплата: </span>
        <span>{Number(afterCalc.monthlyPayment).toFixed(2)}</span>
        <br />
        <span>Общая выплата: </span>
        <span>{Number(afterCalc.totalPayment).toFixed(2)}</span>
        <br />
        <span>Ставка: </span>
        <span>{Number(afterCalc.totalInterest).toFixed(2)}</span>
      </div>
      <Divider />
      {banks.map((bankItem: any) => (
        <div key={bankItem.applicationUrl}>
          <span>{bankItem.bankName}</span> -{" "}
          <span>{bankItem.interestRate}%</span>
          <br />
          <br />
          <Button
            onClick={() => {
              const updatedNewItem = { ...mainData };
              updatedNewItem.selectedInterestRate = Number(
                bankItem.interestRate
              );

              setMainData(updatedNewItem);
            }}
          >
            Выбрать
          </Button>{" "}
          <Button
            type="primary"
            disabled={
              Number(mainData.selectedInterestRate) !==
              Number(bankItem.interestRate)
            }
            onClick={() => {
              window.location = bankItem.applicationUrl;
            }}
          >
            Перейти
          </Button>
          <br />
          <br />
          <Divider/>
        </div>
      ))}
    </LoanCalculatorField>
  );
};
