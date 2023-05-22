import { TMessage } from '@/AppContext/AppContext';

import styles from './TextBalloon.module.scss';

type TProps = {
  message: TMessage;
};

function TextBalloon(props: TProps): JSX.Element | null {
  const { text, type } = props.message;

  return (
    <div
      className={`${styles.text_balloon} ${
        type === 'incoming' ? styles.text_balloon__incoming : ''
      }`}
    >
      {text}
    </div>
  );
}

export { TextBalloon };
