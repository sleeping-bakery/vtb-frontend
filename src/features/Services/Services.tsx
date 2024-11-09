import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { createPayment, getServices } from "../../shared/api/service";
import { ServicesField } from "./Services.styled";
import { Button, Divider, InputNumber, Select } from "antd";
import { getAccount, getCards } from "../../shared/api/accounts";

export const Services = () => {
  const token = useAppSelector(selectToken);
  const [dataItems, setDataItems] = useState([]);
  const [cards, setCards] = useState<any>([]);
  const [mainData, setMainData] = useState<any>({
    cardId: "",
    amount: "",
    serviceId: "",
  });
  const [openCreated, setOpenCreated] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const handleGetServices = (data: any) => {
        setDataItems(data.data.items);
      };

      getServices(process.env.REACT_APP_BACKEND_URL, token, handleGetServices);

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
        cards.filter((cardItem: any) => cardItem.id === mainData.cardId)[0]
          .accountId
      );
      const body = mainData;
      body.currency = account.account[0].currency;

      await createPayment(process.env.REACT_APP_BACKEND_URL, body, token);

      setMainData({
        cardId: "",
        amount: "",
        serviceId: "",
      });
      setOpenCreated(false);
    }
  };

  return (
    <ServicesField>
      <Button
        onClick={() => {
          setOpenCreated(true);
        }}
      >
        Создать платеж
      </Button>

      {openCreated && (
        <div>
          <Select
            placeholder="Услуга"
            options={dataItems.map((item: any) => {
              return {
                value: item.id,
                label: item.shortName,
              };
            })}
            value={mainData.serviceId}
            style={{ width: 150 }}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.serviceId = value;

              setMainData(updatedData);
            }}
          />
          <Select
            placeholder="Карта"
            options={cards.map((item: any) => {
              return {
                value: item.id,
                label: item.pan,
              };
            })}
            value={mainData.cardId}
            style={{ width: 150 }}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.cardId = value;

              setMainData(updatedData);
            }}
          />
          <InputNumber
            placeholder="Сумма"
            value={Number(mainData.amount)}
            onChange={(value) => {
              const updatedNewItem = { ...mainData };
              updatedNewItem.amount = String(value);

              setMainData(updatedNewItem);
            }}
          />
          <Button onClick={handleSendPayment}>Отправить</Button>
        </div>
      )}

      {dataItems.map((item: any) => (
        <div key={item.id}>
          <Divider />
          <p>
            {item.shortName}
            <br />
            {item.name}
            <br />
          </p>
          <div>
            <br />
            <br />
            <p>Приёмник:</p>
            <br />
            <div>
              <p>{item?.receiver?.bank?.name && item.receiver.bank.name}</p>
            </div>
            <div>
              <p></p>
              ИНН: {item.receiver.inn}
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </ServicesField>
  );
};
