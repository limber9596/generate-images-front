import axios from "axios";
import { useLoading } from "../context/LoadingContext";
import { useMessage } from "../context/MessageContext";

export function useImageGeneration() {
  const { setLoading } = useLoading();
  const { showMessage } = useMessage();
  const apiUrl = import.meta.env.VITE_API_URL;

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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = response.data;
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        showMessage("Error generando imagen con máscara");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        showMessage(error.response.data.msg);
      } else {
        showMessage("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  //   // --- Generar imagen solo desde texto ---
  //   const generateImageText = async ({ prompt, setImageUrl }) => {
  //     setLoading(true);
  //     if (!prompt) return showMessage("Escribe un prompt");
  //     setImageUrl("");

  //     try {
  //       const response = await axios.post(`${apiUrl}/generate-image-text`, {
  //         prompt,
  //       });

  //       const data = response.data;
  //       if (data.imageUrl) {
  //         setImageUrl(data.imageUrl);
  //       } else {
  //         showMessage("Error generando imagen desde texto");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       if (error.response) {
  //         showMessage(error.response.data.msg);
  //       } else {
  //         showMessage("No se pudo conectar con el servidor.");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return { generateImageMask };
}
