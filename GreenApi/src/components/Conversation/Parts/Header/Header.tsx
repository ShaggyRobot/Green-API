import { FieldValues, useForm } from 'react-hook-form';

import { useAppContext } from '@/AppContext/AppContext';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';

type TInputsType = {
  contactNum: string;
};

function Header(): JSX.Element {
  const { logOut, appState, setContactPhone, poll } = useAppContext();

  const [activeContactPhone, setActiveContactPhone] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<TInputsType>({ mode: 'onChange' });

  useEffect(() => {
    const activeContact = localStorage.getItem('contact');
    activeContact && setActiveContactPhone(JSON.parse(activeContact).phone);
    activeContactPhone && poll(activeContactPhone);

  }, [activeContactPhone]);


  const submitHandler = (data: FieldValues) => {
    setContactPhone(data.contactNum);
    setActiveContactPhone(data.contactNum);
    reset();
  };

  const formatNum = (num?: string) => {
    if (!num) return;
    const [prefix, code, phNum] = [
      num.slice(0, 1),
      num.slice(1, 4),
      num.slice(4),
    ];

    return `+${prefix}(${code})${phNum}`;
  };

  return (
    <div className={styles.header}>
      <form
        action=''
        className={`${styles.form}`}
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
          type='text'
          {...register('contactNum', {
            required: true,
            pattern: /^\d{11}$/,
          })}
          className={`${styles.form_input} form_input`}
          placeholder='Contact`s phone №'
        />
        <button
          className={styles.set_contact}
          disabled={!!Object.keys(errors).length || !isValid}
        >
          Set
        </button>
      </form>
      {formatNum(appState.contact?.phone)}
      <button className={styles.logout_btn} onClick={logOut}>
        LogOut
      </button>
    </div>
  );
}

export { Header };
