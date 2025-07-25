import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import "../../OurCity-Main/src/style/custom.css"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      
        <App />
      
    </PersistGate>
  </Provider>
);
