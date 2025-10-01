import axios from "axios";
import { useLoading } from "../context/LoadingContext";
import { useMessage } from "../context/MessageContext";
import { useAuth } from "../context/AuthContext";

export function useImageGeneration() {
  const { setLoading } = useLoading();
  const { showMessage } = useMessage();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  // --- Generar imagen con máscara ---
  const generateImageMask = async ({
    prompt,
    file,
    selectedImage,
    setImageUrl,
  }) => {
    console.log("entrando a la funcion generateImageMask");
    console.log("valor de prompt:", prompt);
    console.log("valor de file:", file);
    console.log("valor de selectedImage:", selectedImage);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      if (file) {
        formData.append("boceto", file);
      } else if (selectedImage) {
        const response = await fetch(selectedImage.src);
        const blob = await response.blob();
        const fakeFile = new File([blob], selectedImage.alt + ".png", {
          type: blob.type,
        });
        formData.append("boceto", fakeFile);
      }

      const response = await axios.post(
        `${apiUrl}/generate-image-mask`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        showMessage("Error generando imagen con máscara");
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

  return { generateImageMask };
}
