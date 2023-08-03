import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/styles/normalize.scss";

import "./assets/styles/main.scss";


const rollbarConfig = {
  accessToken: '4bafbfa4fc9549368ecb7d93cefdc8f9',
  environment: 'testenv',
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);
