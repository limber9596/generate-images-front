import React, { useState, useEffect, use } from "react";
import { useLoading } from "../../context/LoadingContext";
import { useMessage } from "../../context/MessageContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function TextToImage({
  prompt,
  setPrompt,
  imageUrl,
  setImageUrl,
  setIsModalOpen,
}) {
  //
  // const [imageUrl, setImageUrl] = useState("./exa.png");
  const apiUrl = import.meta.env.VITE_API_URL;

  const { setLoading } = useLoading();
  const { showMessage } = useMessage();

  const { token } = useAuth();
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (imageUrl) {
      setIsModalOpen(true);
    }
  });
  const generateImage = async () => {
    console.log("entrando a la funcion generateImage");
    console.log("API URL:", apiUrl);
    console.log("Token usado:", token);

    if (!prompt) return alert("Escribe un prompt");
    setImageUrl("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/generate-image-text`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        showMessage(data.error || "Error generando imagen");
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un error (400, 500, etc.)
        showMessage(error.response.data.error || "Error del servidor");

        if (error.response.status === 400) {
          logout(); // solo si es necesario
        }
      } else if (error.request) {
        // La petición se envió pero no hubo respuesta
        showMessage("No se pudo conectar con el servidor");
      } else {
        // Otro tipo de error
        showMessage("Error inesperado: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-generate">
      <div className="content-data">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu prompt"
          className="prompt-input"
          rows={7}
        ></textarea>
        <button
          onClick={generateImage}
          className="generate-button"
          disabled={!!imageUrl || !prompt}
        >
          Generar
        </button>
      </div>
    </div>
  );
}
