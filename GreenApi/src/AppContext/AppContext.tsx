import { deleteNotification, getNextNotification } from '@/Api/Api';
import { createContext, useContext, useEffect, useState } from 'react';

type TMessage = {
  type: 'incoming' | 'outcoming';
  text: string;
};

type TAppState = {
  idInstance: string | null;
  apiTokenInstance: string | null;
  contact: {
    phone: string;
    messages: Array<TMessage>;
  } | null;
};

type TAppContext = {
  appState: TAppState;
  setCreds: (id: string, token: string) => void;
  setContactPhone: (phone: string) => void;
  pushMessage: (msg: TMessage) => void;
  logOut: () => void;
  poll: (phone: string) => void;
};

type TAppContextProvider = React.FC<{ children: React.ReactNode }>;

const AppContext = createContext({} as TAppContext);

const initState: TAppState = {
  apiTokenInstance: null,
  idInstance: null,
  contact: null,
};

const AppContextProvider: TAppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState<TAppState>(initState);

  useEffect(() => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const contact = JSON.parse(localStorage.getItem('contact') || '{}');

    setAppState({ idInstance, apiTokenInstance, contact });
  }, []);

  const setCreds = (idInstance: string, apiTokenInstance: string) => {
    localStorage.setItem('apiTokenInstance', apiTokenInstance);
    localStorage.setItem('idInstance', idInstance);
    setAppState({ ...appState, idInstance, apiTokenInstance });
  };

  const logOut = () => {
    setAppState(initState);
    localStorage.clear();
  };

  const setContactPhone = (phone: string) => {
    const contact = { ...appState.contact, phone, messages: [] };
    localStorage.setItem('contact', JSON.stringify(contact));
    setAppState({ ...appState, contact });
  };

  const pushMessage = (msg: TMessage) => {
    if (!appState.contact) return;

    const contact = { ...appState.contact };
    contact.messages.push(msg);

    localStorage.setItem('contact', JSON.stringify(contact));
    setAppState({ ...appState, contact });
  };

  const poll = async (phone: string) => {
    const activeContact = JSON.parse(localStorage.getItem('contact') || '{}');
    if (!activeContact || activeContact.phone !== phone) return;

    console.info('polling', phone);

    const result = await getNextNotification(
      appState.idInstance,
      appState.apiTokenInstance,
    );

    const message = result?.message;
    if (message && message.sender.slice(0, 11) === activeContact.phone) {
      pushMessage({
        type: 'incoming',
        text: message.text,
      });
    }

    if (result?.id) {
      await deleteNotification(
        appState.idInstance,
        appState.apiTokenInstance,
        result.id,
      );
    }

    await poll(phone);
  };

  return (
    <AppContext.Provider
      value={{ appState, setCreds, logOut, setContactPhone, pushMessage, poll }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {
  useAppContext,
  AppContextProvider,
  type TAppState,
  type TAppContext,
  type TMessage,
};
