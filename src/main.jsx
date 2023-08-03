import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/styles/normalize.scss";

import "./assets/styles/main.scss";
import { ENV } from './config/constants.js';

const rollbarConfig = {
  accessToken: ENV.ROLLBAR_ACCESS_TOKEN,
  environment: ENV.ROLLBAR_ENVIRONMENT,
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);
