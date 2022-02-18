import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { PersistGate } from 'redux-persist/integration/react';

// const axiosInstance = axios.create();
axios.interceptors.request.use(
  function (config) {
    const url = config.url || '';
    let check = url?.toString().includes('/sandbox.punchh.com/api/');
    if (check) {
      var uri = new URL(url?.toString());
      const body = config.data;
      let uriData = uri.pathname.concat(uri.search);
      let secret = process.env.REACT_APP_PUNCHH_CLIENT_SECRET || '';
      let secretString = secret.toString();
      let concatString = '';
      if (body === undefined) {
        concatString = uriData;
      } else {
        concatString = uriData.concat(JSON.stringify(body));
      }
      const signature = CryptoJS.HmacSHA1(
        concatString,
        secretString,
      ).toString();
      config.headers = {
        'x-pch-digest': signature,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter
        basename={process.env.APP_BASENAME ? process.env.APP_BASENAME : ''}
      >
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
