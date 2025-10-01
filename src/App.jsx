import { Routes, Route, Navigate } from "react-router-dom";
import LoginGooglePage from "./pages/LoginGooglePage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta pública */}
      <Route
        path="/login"
        element={!user ? <LoginGooglePage /> : <Navigate to="/" replace />}
      />

      {/* Ruta protegida */}
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
