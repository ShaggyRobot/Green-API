import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { AppContextProvider } from './AppContext/AppContext.tsx';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
);
