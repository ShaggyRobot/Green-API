import { FieldValues, useForm } from 'react-hook-form';

import { sendText } from '@/Api/Api';
import { SendIcon } from './SendIcon';
import { useAppContext } from '@/AppContext/AppContext';

import styles from './InputBlock.module.scss';

function InputBlock(): JSX.Element {
  const { appState, pushMessage } = useAppContext();
  const { contact, idInstance, apiTokenInstance } = appState;
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const sendHandler = (data: FieldValues) => {
    const { text } = data;

    if (!text || !contact || !idInstance || !apiTokenInstance) return;

    sendText(text, contact.phone, idInstance, apiTokenInstance);
    pushMessage({ type: 'outcoming', text });
    reset();
  };

  return (
    <div className={styles.input_block}>
      <form
        id='txt-input'
        className={styles.input_wrapper}
        onSubmit={handleSubmit(sendHandler)}
      >
        <input
          type='text'
          autoComplete='off'
          {...register('text')}
          className={styles.txt_input}
          placeholder={
            !appState.contact
              ? 'Set contact`s phone № first.'
              : 'Type a message'
          }
          disabled={!appState.contact?.phone}
        />
      </form>

      {appState.contact?.phone && (
        <div className='btn_wrapper'>
          <button type='submit' form='txt-input' className={styles.send_btn}>
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export { InputBlock };
