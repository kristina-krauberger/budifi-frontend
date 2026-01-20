import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.jsx";
import { LoggedInUserProvider } from "./context/LoggedInUserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoggedInUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggedInUserProvider>
  </StrictMode>,
);
