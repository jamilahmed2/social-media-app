import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers/index';
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={ "456074370128-iljjrho3dm4gk82qrmppe1ii8mhnuovf.apps.googleusercontent.com"}> <App /></GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode>
);

