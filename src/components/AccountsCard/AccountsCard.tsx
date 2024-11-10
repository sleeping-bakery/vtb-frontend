import { Button, Divider, Input, Modal, Select } from "antd";
import {
  createCard,
  deleteCard,
  getCardCVV,
  getCardDetail,
  updateCard,
} from "../../shared/api/cards";
import { useAppSelector } from "../../app/store/hooks";
import { selectToken } from "../../app/store/user/userSlice";
import { useState } from "react";
import { CARD_STATUSES } from "../../shared/consts/consts";
import { sha256 } from "js-sha256";

export const AccountCard: React.FC<{ id: string; cards: any }> = ({
  id,
  cards,
}) => {
  const [cardDetails, setCardsDetails] = useState<Record<any, any>>({});
  const [cardCVVs, setCardCVV] = useState<Record<any, any>>({});
  const token = useAppSelector(selectToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setStatus] = useState(0);
  const [newPin, setNewPin] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (id: string) => {
    setIsModalOpen(false);

    if (process.env.REACT_APP_BACKEND_URL && token) {
      const hashedPin = sha256(newPin);
      const body = {
        status: newStatus,
        id,
        publicKey: process.env.REACT_APP_PUBLIC_PIN_KEY,
        encodedPinCode: hashedPin,
      };

      await updateCard(process.env.REACT_APP_BACKEND_URL, body, token);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateCard = async () => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      await createCard(process.env.REACT_APP_BACKEND_URL, token, {
        accountId: id,
      });
    }
    window.location.reload();
  };

  const handleGetDetails = async (cardId: string) => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const cardDetail = await getCardDetail(
        process.env.REACT_APP_BACKEND_URL,
        cardId,
        token
      );

      setCardsDetails({ ...cardDetails, [cardId]: cardDetail });
    }
  };

  const handleGetCVV = async (cardId: string) => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      const cardCVV = await getCardCVV(
        process.env.REACT_APP_BACKEND_URL,
        cardId,
        token
      );

      setCardCVV({ ...cardCVVs, [cardId]: cardCVV });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (process.env.REACT_APP_BACKEND_URL && token) {
      await deleteCard(process.env.REACT_APP_BACKEND_URL, cardId, token);
    }
  };

  const handleChange = (value: string) => {
    setStatus(Number(value));
  };

  const handleChangePin = (event: any) => {
    setNewPin(event.target.value);
  };

  return (
    <div>
      <div>
        <Button onClick={handleCreateCard}>Добавить карту</Button>
      </div>
      {cards.length > 0 && <Divider />}
      <div>
        {cards.map((card: any, index: number) => (
          <div key={card.id}>
            Карта №{index + 1} {card.pan} {CARD_STATUSES[card.status]}
            <br />
            <br />
            {cardDetails[card.id] && (
              <div>
                Действительна до: {cardDetails[card.id].cardExpiry}
                <br />
                Владелец: {cardDetails[card.id].embossingName}
              </div>
            )}
            {cardCVVs[card.id] && (
              <div>
                CVV: {cardCVVs[card.id].cvv}
                <br />
                <br />
              </div>
            )}
            <Button
              onClick={async () => {
                await handleGetDetails(card.id);
                await handleGetCVV(card.id);
              }}
            >
              Детали
            </Button>{" "}
            <Button onClick={showModal}>Изменить данные</Button>{" "}
            <Button
              onClick={async () => {
                await handleDeleteCard(card.id);
                window.location.reload();
              }}
            >
              Удалить карту
            </Button>
            <Divider />
            <Modal
              title="Изменение данных карты"
              open={isModalOpen}
              onOk={() => {
                handleOk(card.id);
                setStatus(card.status);
              }}
              onCancel={handleCancel}
            >
              <br />
              <Select
                placeholder="Статус карты"
                defaultValue={CARD_STATUSES[card.status]}
                style={{ width: 400 }}
                onChange={handleChange}
                options={[
                  { value: 1, label: CARD_STATUSES[1] },
                  { value: 2, label: CARD_STATUSES[2] },
                  { value: 3, label: CARD_STATUSES[3] },
                ]}
              />
              <br />
              <br />
              <Input
                style={{ width: 400 }}
                placeholder="Новый пинкод"
                onChange={handleChangePin}
              />
              <br />
              <br />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};
