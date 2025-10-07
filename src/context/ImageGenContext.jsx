// context/ImageGeneratorContext.jsx
import { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { useMessage } from "./MessageContext";
import { useAuth } from "./AuthContext";
/////////////////////////////////////////////
const ImageGeneratorContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;
export function ImageGeneratorProvider({ children }) {
  const [promptText, setPromptText] = useState("");
  const [promptMask, setPromptMask] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [selected, setSelected] = useState("text");
  const [heigth, setHeigth] = useState(false);
  const [width, setWidth] = useState(false);
  const [resizedImage, setResizedImage] = useState(null);

  const { setLoading } = useLoading();
  const { showMessage } = useMessage();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!selectedImage) return;

    const img = new Image();
    img.src = selectedImage.src;
    img.onload = () => {
      // setDimensions({ width: img.width, height: img.height });
      setHeigth(img.height);
      setWidth(img.width);
    };
  }, [selectedImage]);
  ///////////////////////////////////////////////////////////

  // Aquí podrías incluir funciones compartidas
  const downloadImage = async (resizedImage) => {
    if (!resizedImage) return;

    try {
      const response = await axios.get(resizedImage, {
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
  const generateImageMask = async () => {
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

  const handleSelect = (image) => {
    setSelectedImage(image);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDeselect = () => {
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ImageGeneratorContext.Provider
      value={{
        promptText,
        setPromptText,
        promptMask,
        setPromptMask,
        imageUrl,
        setImageUrl,
        selectedImage,
        setSelectedImage,
        file,
        setFile,
        previewUrl,
        setPreviewUrl,
        isModalOpen,
        setIsModalOpen,
        inputRef,
        selected,
        setSelected,
        downloadImage,
        generateImageMask,
        handleSelect,
        handleDeselect,
        handleCloseModal,
        heigth,
        width,
        resizedImage,
        setResizedImage,
      }}
    >
      {children}
    </ImageGeneratorContext.Provider>
  );
}

export function useImageGenerator() {
  return useContext(ImageGeneratorContext);
}
