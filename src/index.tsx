import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { PersistGate } from 'redux-persist/integration/react';

// import TagManager from 'react-gtm-module';
//
// const tagManagerArgs = {
//   // gtmId: process.env.REACT_APP_GTM_ID || '',
//   gtmId: 'GTM-WDDWZHL',
// };

// TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename="">
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
