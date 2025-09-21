// MessageContext.tsx
import { createContext, useContext, useState } from "react";
import MessageModal from "../components/MessageModal";

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const [mensaje, setMensaje] = useState("");

  const showMessage = (msg) => setMensaje(msg);
  const hideMessage = () => setMensaje("");

  return (
    <MessageContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      <MessageModal
        isOpen={mensaje !== ""}
        mensaje={mensaje}
        onClose={hideMessage}
      />
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
