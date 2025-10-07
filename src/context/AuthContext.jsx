import { createContext, useContext, useState, useEffect } from "react";
import { logoutBackend } from "../utils/auth";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Al iniciar, cargar datos desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  // Guardar usuario + token
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // Cerrar sesión
  const logout = async () => {
    if (token) await logoutBackend(token);
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
