import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './input.css'
import '../src/css/navbar.css'
import '../src/css/profile.css'
import '../src/css/classroom.css'
import '../src/css/minaAi.css'
import { NextUIProvider } from '@nextui-org/react';
import  {UserContextProvider} from './context/UserContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <UserContextProvider>
          <App style={{backgroundColor:'#0F0E0E'}}/>
        </UserContextProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
