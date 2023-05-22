import { TMessage, useAppContext } from '@/AppContext/AppContext';
import { TextBalloon } from '../TextBalloon/TextBalloon';

import styles from './MessagesBlock.module.scss';

function MessagesBlock(): JSX.Element {
  const { appState } = useAppContext();
  const messages = appState.contact?.messages;

  return (
    <div className={styles.messages_block}>
      <div className={styles.bg}></div>
      {messages &&
        messages.map((msg: TMessage, idx) => {
          return <TextBalloon message={msg} key={idx} />;
        })}
    </div>
  );
}

export { MessagesBlock };
