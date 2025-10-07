import { useEffect, useRef } from "react";
import axios from "axios";

export function useUserActivity({ token, logout, showMessage, apiUrl }) {
  const timer = useRef(null);
  const pingTimeout = useRef(null);

  useEffect(() => {
    if (!token) return;

    const TIMEOUT = 5 * 60 * 1000; // 3 minutos inactividad
    const PING_DELAY = 5000; // 5 segundos debounce para ping

    const sendPing = () => {
      if (!token) return;
      axios.post(`${apiUrl}/ping`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    };

    const debouncedPing = () => {
      clearTimeout(pingTimeout.current);
      pingTimeout.current = setTimeout(sendPing, PING_DELAY);
    };

    const resetTimer = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        logout();
        showMessage("Sesión cerrada por inactividad");
      }, TIMEOUT);

      debouncedPing(); // cada actividad también hace ping al backend
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer(); // iniciar timer y primer ping

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timer.current);
      clearTimeout(pingTimeout.current);
    };
  }, [token, logout, showMessage, apiUrl]);
}
