import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './input.css'
import '../src/css/navbar.css'
import { NextUIProvider } from '@nextui-org/react';
import  {UserContextProvider} from './context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
