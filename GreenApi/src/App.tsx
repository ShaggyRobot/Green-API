import { Authorize } from './components/Authorize/Authorize';
import { Conversation } from './components/Conversation/Conversation';

import { useAppContext } from './AppContext/AppContext';

import './App.scss';

function App() {
  const { appState } = useAppContext();

  const isAuth = () => {
    return !!(appState.idInstance && appState.apiTokenInstance);
  };

  return (
    <div className='app'>{isAuth() ? <Conversation /> : <Authorize />}</div>
  );
}

export default App;
