import React, { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { useMessage } from "../context/MessageContext";
import axios from "axios";

export default function TextToImage({ prompt, setPrompt }) {
  //
  const [imageUrl, setImageUrl] = useState(null);
  // const [imageUrl, setImageUrl] = useState("./exa.png");
  const apiUrl = import.meta.env.VITE_API_URL;

  const { setLoading } = useLoading();
  const { showMessage } = useMessage();
  ////////////////////////////////////////////////////////////
  const generateImage = async () => {
    console.log("entrando a la funcion generateImage");
    console.log("API URL:", apiUrl);

    if (!prompt) return alert("Escribe un prompt");
    setImageUrl("");
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/generate-image-text`, {
        prompt,
      });
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

  const downloadImage = async () => {
    if (!imageUrl) return;

    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob", // importante
      });

      const blob = new Blob([response.data], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "imagen_generada.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando la imagen:", error);
    }
  };
  return (
    <div className="content-text">
      <div className="info-box">
        <div className="input-button-wrapper">
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
    </div>
  );
}
