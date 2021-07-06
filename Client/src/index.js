import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { Routes } from './routes';

import { UserProvider } from "../src/user.context"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
