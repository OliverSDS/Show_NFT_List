import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {server,app_id} from "./config";

import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <MoralisProvider
          serverUrl={server}
          appId={app_id}
      >
          <App />
      </MoralisProvider>
  </React.StrictMode>
);

