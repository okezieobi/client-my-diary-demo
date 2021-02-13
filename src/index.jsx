import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import theme from './theme';
import worker from './mocks/browser';
import authServices from './components/Auth';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <authServices.ProvideAuth>
        <App />
      </authServices.ProvideAuth>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
