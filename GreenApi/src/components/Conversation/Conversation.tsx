import { Header } from './Parts/Header/Header';
import { InputBlock } from './Parts/InputBlock/InputBlock';
import { MessagesBlock } from './Parts/MessagesBlock/MessagesBlock';

import styles from './Conversation.module.scss';

function Conversation(): JSX.Element {
  return (
    <div className={styles.conversation}>
      <Header />
      <MessagesBlock  />
      <InputBlock />
    </div>
  );
}

export { Conversation };
