import axios from 'axios';

const baseURL = 'https://api.green-api.com/';

axios.defaults.baseURL = baseURL;

const sendText = async (
  text: string,
  phone: string,
  idInstance: string,
  apiTokenInstance: string,
) => {
  await axios.post(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
    chatId: `${phone}@c.us`,
    message: text,
  });
};

const deleteNotification = async (
  idInstance: string | null,
  apiTokenInstance: string | null,
  receiptId: number,
) => {
  const res = await axios.delete(
    `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );

  return res.status === 200;
};

const getNextNotification = async (
  idInstance: string | null,
  apiTokenInstance: string | null,
) => {
  let resDTO;
  let id;
  if (!idInstance || !apiTokenInstance) return;

  const res = await axios.get(
    `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
  );
  if (res.status === 200) {
    if (!res.data) {
      console.log('No new notifications');
    } else {
      id = res.data.receiptId;

      if (res.data.body.messageData.typeMessage === 'textMessage') {
        resDTO = {
          sender: res.data.body.senderData.chatId,
          text: res.data.body.messageData.textMessageData.textMessage,
        };
      }

      return { id, message: resDTO };
    }
  }
};

export { sendText, getNextNotification, deleteNotification };
