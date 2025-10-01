import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import "../styles/LoginGoogle.css";
export default function LoginPage({ onLoginSuccess }) {
  //////////////////////////////////////////////777
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  ////////////////////////////////////////////////
  const { login } = useAuth();
  const { setLoading } = useLoading();

  const handleCredentialResponse = async (response) => {
    try {
      setLoading(true);
      const idToken = response.credential;

      // Enviar token a tu backend para verificar y obtener JWT propio
      const res = await axios.post(
        `${apiUrl}/auth/google`,
        { idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;
      login(data.user, data.token);

      // Llamar callback si viene desde props
      if (onLoginSuccess) onLoginSuccess(data.user);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Crear y cargar el script de Google
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };

    document.body.appendChild(script);

    // Limpiar script al desmontar
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LM Render</h1>
        <img src="/logo_img.png" alt="Logo" style={{ marginBottom: "20px" }} />
        <div id="googleSignInDiv"></div>
      </div>
    </div>
  );
}
