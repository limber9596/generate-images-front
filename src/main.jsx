import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Modal from "react-modal"; // <-- Importa Modal

// <-- Esto es lo importante
Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <MessageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MessageProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
