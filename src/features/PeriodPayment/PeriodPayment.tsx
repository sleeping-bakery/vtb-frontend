import { useEffect, useState } from "react";
import { PeriodPaymentField } from "./PeriodPayment.styled";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import {
  createPeriodPayment,
  deletePeriodPayment,
  getPeriodPayment,
  periodPayment,
} from "../../shared/api/periodpayment";
import { Button, Input, InputNumber, Select, Table } from "antd";
import {
  ALIGNMENT_TYPE,
  IDENTIFICATION_TYPE,
  PERIOD_TYPE,
} from "../../shared/consts/consts";
import { getAccount, getCards } from "../../shared/api/accounts";
import { CURRENCY_ICONS } from "../../shared/consts/icons";

export const PeriodPayment = () => {
  const [data, setData] = useState<any>([]);
  const [mainData, setMainData] = useState<any>({
    amount: 0,
    card: null,
    creditorName: "",
    creditorType: null,
    paymentData: "",
  });
  const [cards, setCards] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const [newItem, setNewItem] = useState({
    period: "",
    startDateConsents: "",
    amount: "",
  });
  const [isPaymentOpened, setIsOpened] = useState(false);
  const [createSubForm, setSubForm] = useState(false);
  const [paymentValue, setPaymentValue] = useState<number | null>(null);

  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      getPeriodPayment(
        process.env.REACT_APP_BACKEND_URL,
        token,
        (dataPayments: any) => {
          setData(dataPayments);
        }
      );

      getCards(process.env.REACT_APP_BACKEND_URL, token, (dataCards: any) => {
        setCards(dataCards);
      });
    }
  }, [token]);

  const handleFormOpen = () => setSubForm(true);
  const handleFormClose = () => setSubForm(false);

  const columns = [
    {
      title: "Период",
      dataIndex: "period",
      key: "period",
      render: (text: any) => {
        return <div>{PERIOD_TYPE[text]}</div>;
      },
    },
    {
      title: "Начало действия ограничения",
      dataIndex: "startDateConsents",
      key: "startDateConsents",
      render: (text: any) => {
        return <div>{ALIGNMENT_TYPE[text]}</div>;
      },
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const handleCreateConsent = async () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      try {
        const account = await getAccount(
          process.env.REACT_APP_BACKEND_URL,
          token,
          cards.filter((cardItem: any) => cardItem.id === mainData.card)[0]
            .accountId
        );

        const body = {
          amount: String(mainData.amount),
          currency: account.account[0].currency,
          periodAmount: items.map((itemPeriodAmount: any) => {
            return {
              periodType: itemPeriodAmount.period,
              periodAlignment: itemPeriodAmount.startDateConsents,
              amount: {
                amount: itemPeriodAmount.amount,
                currency: account.account[0].currency,
              },
            };
          }),
          creditorName: mainData.creditorName,
          cardGuid: mainData.card,
          creditorIdentification: {
            schemeName: mainData.creditorType,
            identification: mainData.paymentData,
          },
        };

        await createPeriodPayment(
          process.env.REACT_APP_BACKEND_URL,
          token,
          body
        );

        setItems([]);
        setMainData({
          amount: 0,
          card: null,
          creditorName: "",
          creditorType: null,
          paymentData: "",
        });
      } catch (e) {}
    }
  };

  return (
    <PeriodPaymentField>
      <Button onClick={handleFormOpen}>Создание подписки</Button>
      {createSubForm && (
        <div>
          <br />
          <h3>Форма создания подписки</h3>
          <br />
          <InputNumber
            value={mainData.amount}
            placeholder="Сумма"
            min={0}
            style={{ width: 600 }}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.amount = value;

              setMainData(updatedData);
            }}
          />
          <br />
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
            style={{ width: 600 }}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.card = value;

              setMainData(updatedData);
            }}
          />
          <br />
          <br />
          <h3>Получатель</h3>
          <br />
          <Input
            placeholder="Именование получателя"
            value={mainData.creditorName}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.creditorName = value.target.value;

              setMainData(updatedData);
            }}
            style={{ width: 800 }}
          />
          <br />
          <br />
          <Select
            placeholder="Тип оплаты подписки"
            value={mainData.creditorType}
            options={Array(Object.values(IDENTIFICATION_TYPE).length)
              .fill(0)
              .map((item: number, index: number) => {
                return {
                  value: index + 1,
                  label: IDENTIFICATION_TYPE[index + 1],
                };
              })}
            style={{ width: 800 }}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.creditorType = value;

              setMainData(updatedData);
            }}
          />
          <br />
          <br />
          <Input
            placeholder="Реквизит для оплаты"
            value={mainData.paymentData}
            onChange={(value) => {
              const updatedData = { ...mainData };

              updatedData.paymentData = value.target.value;

              setMainData(updatedData);
            }}
            style={{ width: 800 }}
          />
          <br />
          <br />
          <h3>Добавление ограничения</h3>
          <br />
          <Select
            options={Array(Object.values(PERIOD_TYPE).length)
              .fill(0)
              .map((item: number, index: number) => {
                return { value: index + 1, label: PERIOD_TYPE[index + 1] };
              })}
            placeholder="Период"
            value={PERIOD_TYPE[Number(newItem.period)]}
            onChange={(value: any) => {
              const updatedNewItem = { ...newItem };
              updatedNewItem.period = value;

              setNewItem(updatedNewItem);
            }}
          />{" "}
          <Select
            options={Array(Object.values(ALIGNMENT_TYPE).length)
              .fill(0)
              .map((item: number, index: number) => {
                return { value: index + 1, label: ALIGNMENT_TYPE[index + 1] };
              })}
            placeholder="Начало действия ограничения"
            value={ALIGNMENT_TYPE[Number(newItem.startDateConsents)]}
            onChange={(value: any) => {
              const updatedNewItem = { ...newItem };
              updatedNewItem.startDateConsents = value;

              setNewItem(updatedNewItem);
            }}
          />{" "}
          <InputNumber
            placeholder="Сумма"
            min={0}
            value={Number(newItem.amount)}
            onChange={(value) => {
              const updatedNewItem = { ...newItem };
              updatedNewItem.amount = String(value);

              setNewItem(updatedNewItem);
            }}
          />
          <br />
          <br />
          <Button
            onClick={() => {
              setItems([
                ...items,
                { ...newItem, key: items.length + "_consent_table_item" },
              ]);
              setNewItem({
                period: "",
                startDateConsents: "",
                amount: "",
              });
            }}
          >
            Добавить ограничение
          </Button>
          <br />
          <br />
          <Table columns={columns} dataSource={items} />
          <br />
          <br />
          <Button
            onClick={async () => {
              handleFormClose();
              await handleCreateConsent();
            }}
          >
            Создать
          </Button>{" "}
          <Button
            onClick={async () => {
              handleFormClose();
              setItems([]);
              setMainData({
                amount: 0,
                card: null,
                creditorName: "",
                creditorType: null,
                paymentData: "",
              });
            }}
          >
            Закрыть
          </Button>
        </div>
      )}

      <br />
      <br />
      <h2>Подписки</h2>
      <br />

      {data.map((dataItem: any) => (
        <div key={dataItem.consentBanking.data.consentId}>
          Название компании:{" "}
          {dataItem.consentBanking.data.initiation.creditor.name}
          <br />
          Идентификатор получателя:{" "}
          {dataItem.consentBanking.data.initiation.debtorAccount.identification}
          <br />
          Ограничение перевода:{" "}
          {
            dataItem.consentBanking.data.controlParameters
              .maximumIndividualAmount.amount
          }{" "}
          {
            CURRENCY_ICONS[
              String(
                dataItem.consentBanking.data.controlParameters
                  .maximumIndividualAmount.currency
              )
            ]
          }
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => {
              setIsOpened(true);
            }}
          >
            Совершить платёж
          </Button>
          <br />
          <br />
          <Button
            onClick={async () => {
              if (process.env.REACT_APP_BACKEND_URL && token) {
                await deletePeriodPayment(
                  process.env.REACT_APP_BACKEND_URL,
                  token,
                  dataItem.id
                );
              }
            }}
          >
            Удалить
          </Button>
          {isPaymentOpened && (
            <div>
              <InputNumber
                onChange={(value) => {
                  setPaymentValue(Number(value));
                }}
                placeholder="Сумма"
                value={paymentValue || ""}
              />
              <Button
                onClick={async () => {
                  if (process.env.REACT_APP_BACKEND_URL && token) {
                    await periodPayment(
                      process.env.REACT_APP_BACKEND_URL,
                      token,
                      {
                        periodPaymentConsentId: dataItem.id,
                        amount: String(paymentValue),
                        currency:
                          dataItem.consentBanking.data.controlParameters
                            .maximumIndividualAmount.currency,
                      }
                    );

                    setPaymentValue(null);
                  }
                }}
              >
                Совершить платеж
              </Button>
            </div>
          )}
        </div>
      ))}
    </PeriodPaymentField>
  );
};
