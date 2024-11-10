import { useEffect, useState } from "react";
import { UnidentifiedPaymentField } from "./UnidentifiedPayment.styled";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { getAccount, getCards } from "../../shared/api/accounts";
import { Button, Input, InputNumber, Select } from "antd";
import { IDENTIFICATION_TYPE } from "../../shared/consts/consts";
import { createPayment } from "../../shared/api/unidentifiedpayment";

export const UnidentifiedPayment = () => {
  const [cards, setCards] = useState<any>([]);
  const [mainData, setMainData] = useState<any>({
    cardGuid: "",
    amount: "",
    creditPaymentAccountIdentificationDynamicType: "",
    creditAccountIdentification: "",
  });

  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      getCards(process.env.REACT_APP_BACKEND_URL, token, (cardsInfo: any) => {
        setCards(cardsInfo);
      });
    }
  }, [token]);

  const handleSendPayment = async () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const account = await getAccount(
        process.env.REACT_APP_BACKEND_URL,
        token,
        cards.filter((cardItem: any) => cardItem.id === mainData.cardGuid)[0]
          .accountId
      );

      const body = mainData;
      body.currency = account.account[0].currency;

      await createPayment(process.env.REACT_APP_BACKEND_URL, body, token);

      setMainData({
        cardGuid: "",
        amount: "",
        creditPaymentAccountIdentificationDynamicType: "",
        creditAccountIdentification: "",
      });
    }
  };
  return (
    <UnidentifiedPaymentField>
      <h1>Создание платежа</h1>
      <br />
      <Select
        placeholder="Карта"
        options={cards.map((item: any) => {
          return {
            value: item.id,
            label: item.pan,
          };
        })}
        value={mainData.card}
        style={{ width: 800 }}
        onChange={(value) => {
          const updatedData = { ...mainData };

          updatedData.cardGuid = value;

          setMainData(updatedData);
        }}
      />
      <br />
      <br />
      <span>Сумма платежа: </span>
      <InputNumber
        placeholder="Сумма"
        value={Number(mainData.amount)}
        onChange={(value) => {
          const updatedNewItem = { ...mainData };
          updatedNewItem.amount = String(value);

          setMainData(updatedNewItem);
        }}
      />
      <br />
      <br />
      <Input
        style={{ width: 800 }}
        placeholder="Имя получателя"
        value={mainData.creditAccountIdentification}
        onChange={(value) => {
          const updatedData = { ...mainData };

          updatedData.creditAccountIdentification = value.target.value;

          setMainData(updatedData);
        }}
      />
      <br />
      <br />
      <span>Тип перевода: </span>

      <Select
        style={{ width: 300 }}
        placeholder="Тип перевода"
        value={mainData.creditPaymentAccountIdentificationDynamicType}
        options={Array(Object.values(IDENTIFICATION_TYPE).length)
          .fill(0)
          .map((item: number, index: number) => {
            return {
              value: index + 1,
              label: IDENTIFICATION_TYPE[index + 1],
            };
          })}
        onChange={(value) => {
          const updatedData = { ...mainData };

          updatedData.creditPaymentAccountIdentificationDynamicType = value;

          setMainData(updatedData);
        }}
      />
      <br />
      <br />
      <Button onClick={handleSendPayment}>Отправить</Button>
    </UnidentifiedPaymentField>
  );
};
