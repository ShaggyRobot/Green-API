import { FieldValues, useForm } from 'react-hook-form';

import { AuthLogo } from './AuthLogo';
import { useAppContext } from '@/AppContext/AppContext';

import styles from './Authorize.module.scss';

type TInputsType = {
  id: string;
  token: string;
};

function Authorize(): JSX.Element {
  const { setCreds } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TInputsType>({ mode: 'onChange' });

  const submitHandler = (data: FieldValues) => {
    setCreds(data.id, data.token);
  };

  return (
    <div className={styles.authorize}>
      <div className={styles.content}>
        <AuthLogo />
        <div className={styles.form_wrapper}>
          Provide GreenAPI idInstance and apiTokenInstance:
          <form
            action=''
            className='form'
            onSubmit={handleSubmit(submitHandler)}
          >
            <input
              type='text'
              {...register('id', { pattern: /^[0-9]+$/, required: true })}
              placeholder='Id:'
              className='form_input'
            />
            <input
              type='text'
              {...register('token', {
                pattern: /^[a-zA-Z0-9]+$/,
                required: true,
              })}
              placeholder='Token:'
              className='form_input'
            />
            <button
              className={styles.submit_btn}
              type='submit'
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className={styles.strip}></div>
    </div>
  );
}

export { Authorize };
